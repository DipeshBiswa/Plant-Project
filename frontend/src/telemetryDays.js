export function groupReadingsByDay(data) {
  const days = new Map();

  for (const plant of data) {
    // Keep the calendar date from the API's LocalDateTime without timezone conversion.
    const day = typeof plant.timestamp === 'string'
      ? plant.timestamp.match(/^\d{4}-\d{2}-\d{2}(?=[ T]|$)/)?.[0] ?? 'Unknown date'
      : 'Unknown date';

    if (!days.has(day)) {
      days.set(day, { day, readings: [] });
    }

    days.get(day).readings.push(plant);
  }

  return [...days.values()];
}

const dayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDayLabel(day) {
  const date = new Date(`${day}T00:00:00Z`);

  return Number.isNaN(date.getTime()) ? day : dayFormatter.format(date);
}
