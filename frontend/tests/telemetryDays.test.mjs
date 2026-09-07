import assert from 'node:assert/strict';
import test from 'node:test';
import { groupReadingsByDay } from '../src/telemetryDays.js';

test('combines interleaved days while preserving first-seen day and reading order', () => {
  const first = { id: 1, timestamp: '2026-09-06 09:00:00' };
  const second = { id: 2, timestamp: '2026-09-05 12:00:00' };
  const third = { id: 3, timestamp: '2026-09-06 08:00:00' };

  assert.deepEqual(groupReadingsByDay([first, second, third]), [
    { day: '2026-09-06', readings: [first, third] },
    { day: '2026-09-05', readings: [second] },
  ]);
});

test('uses the recorded calendar day across midnight without timezone conversion', () => {
  const groups = groupReadingsByDay([
    { timestamp: '2026-09-05 23:59:59' },
    { timestamp: '2026-09-06 00:00:00' },
    { timestamp: '2026-09-06T00:01:00+14:00' },
  ]);

  assert.deepEqual(groups.map(({ day }) => day), ['2026-09-05', '2026-09-06']);
  assert.equal(groups[1].readings.length, 2);
});

test('keeps records with absent or unrecognized timestamps visible', () => {
  const readings = [
    { id: 1 },
    { id: 2, timestamp: null },
    { id: 3, timestamp: '' },
    { id: 4, timestamp: 'unrecognized timestamp' },
  ];

  assert.deepEqual(groupReadingsByDay(readings), [{ day: 'Unknown date', readings }]);
});

test('preserves original objects and every field, including zero values', () => {
  const plant = Object.freeze({
    id: 0,
    sunlight: 0,
    roomTemp: 0,
    humidity: 0,
    soilMoisture: 0,
    timestamp: '2026-09-06 12:00:00',
  });
  const data = Object.freeze([plant]);

  assert.equal(groupReadingsByDay(data)[0].readings[0], plant);
  assert.deepEqual(data, [plant]);
});

test('does not invent sections for an empty response', () => {
  assert.deepEqual(groupReadingsByDay([]), []);
});

test('adds sections as readings cross year, month, and leap-day boundaries', () => {
  const initialReadings = [
    { id: 1, timestamp: '2027-12-31 23:59:59' },
    { id: 2, timestamp: '2028-01-01 00:00:00' },
  ];
  const initialGroups = groupReadingsByDay(initialReadings);
  const additionalReadings = [
    { id: 3, timestamp: '2028-01-01 12:00:00' },
    { id: 4, timestamp: '2028-01-31 23:59:59' },
    { id: 5, timestamp: '2028-02-01 00:00:00' },
    { id: 6, timestamp: '2028-02-29 23:59:59' },
    { id: 7, timestamp: '2028-03-01 00:00:00' },
  ];
  const expandedGroups = groupReadingsByDay([...initialReadings, ...additionalReadings]);

  assert.deepEqual(initialGroups.map(({ day }) => day), ['2027-12-31', '2028-01-01']);
  assert.deepEqual(initialGroups.map(({ readings }) => readings.length), [1, 1]);
  assert.deepEqual(expandedGroups.map(({ day }) => day), [
    '2027-12-31',
    '2028-01-01',
    '2028-01-31',
    '2028-02-01',
    '2028-02-29',
    '2028-03-01',
  ]);
  assert.deepEqual(expandedGroups.map(({ readings }) => readings.length), [1, 2, 1, 1, 1, 1]);
  assert.equal(expandedGroups[1].readings[0], initialReadings[1]);
  assert.equal(expandedGroups[1].readings[1], additionalReadings[0]);
});

test('preserves all readings and their order across 366 interleaved days', () => {
  const dayCount = 366;
  const readingsPerDay = 24;
  const days = Array.from({ length: dayCount }, (_, index) => (
    new Date(Date.UTC(2027, 11, 31 + index)).toISOString().slice(0, 10)
  )).reverse();
  const data = Object.freeze(Array.from({ length: readingsPerDay }, (_, hourIndex) => (
    days.map((day, dayIndex) => Object.freeze({
      id: hourIndex * dayCount + dayIndex,
      timestamp: `${day} ${String(23 - hourIndex).padStart(2, '0')}:00:00`,
      soilMoisture: hourIndex,
      humidity: dayIndex % 100,
    }))
  )).flat());

  const groups = groupReadingsByDay(data);

  assert.equal(data.length, 8784);
  assert.equal(groups.length, dayCount);
  assert.deepEqual(groups.map(({ day }) => day), days);
  assert.equal(groups.reduce((total, { readings }) => total + readings.length, 0), data.length);

  for (const [dayIndex, group] of groups.entries()) {
    assert.equal(group.readings.length, readingsPerDay);

    for (const [hourIndex, reading] of group.readings.entries()) {
      assert.equal(reading, data[hourIndex * dayCount + dayIndex]);
    }
  }
});
