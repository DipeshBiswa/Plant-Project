import { useEffect, useState } from "react";
import './TelemetryData.css';
import { formatDayLabel, groupReadingsByDay, sortReadingsNewestFirst } from './telemetryDays.js';
import { TelemetryReading } from './TelemetryReading.jsx';

function TelemetryData(){
    const [data, setPlantData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const sortedReadings = sortReadingsNewestFirst(data);
    const latestReading = sortedReadings[0];

    useEffect(() => {
        const controller = new AbortController();
        let timer;
        async function getPlantData(){
            try{
                const response = await fetch("https://plant-project-production.up.railway.app/telemetry", {signal:controller.signal, cache: 'no-store'});
                if(!response.ok){
                    throw new Error("Failed to fetch plant data");
                }
                const data = await response.json();
                setPlantData(data);
                setError('');
            }catch(error){
                if (!controller.signal.aborted) {
                    console.error(error);
                    setError('Unable to refresh plant data. Retrying automatically.');
                }
            }finally{
                if (!controller.signal.aborted){
                    setIsLoading(false);
                    timer = setTimeout(getPlantData, 10000);
                }
            }
        }
        getPlantData()
        return () =>{
            controller.abort();
            clearTimeout(timer);
        }
    }, []);

    return(
        <section className="telemetry" aria-labelledby="telemetry-title">
            <header className="telemetry__header">
                <div>
                    <p className="section-caption">Light, water &amp; climate</p>
                    <h2 id="telemetry-title">Plant Data</h2>
                    <p className="telemetry__description">Readings refresh every 10 seconds. Open a reading to see your plant’s environmental details.</p>
                </div>
                <span className="telemetry__header-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M5 20V10m7 10V4m7 16v-7M3 20h18" />
                        <circle cx="5" cy="10" r="2" />
                        <circle cx="12" cy="4" r="2" />
                        <circle cx="19" cy="13" r="2" />
                    </svg>
                </span>
            </header>
            {error && <p className="telemetry__status" role="status">{error}</p>}
            <section className="telemetry__latest" aria-labelledby="latest-data-title">
                <h3 className="telemetry__section-title" id="latest-data-title">Most recent data</h3>
                {latestReading ? (
                    <TelemetryReading plant={latestReading} />
                ) : (
                    <p className="telemetry__status" role="status">
                        {isLoading ? 'Loading plant data…' : error ? 'Plant data is currently unavailable.' : 'No readings yet.'}
                    </p>
                )}
            </section>
            {sortedReadings.length > 0 && (
                <details className="telemetry__history" aria-labelledby="reading-history-title">
                    <summary className="telemetry__history-summary">
                        <h3 className="telemetry__section-title" id="reading-history-title">Reading history</h3>
                        <svg className="telemetry__history-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </summary>
                    <div className="telemetry__days">
                        {groupReadingsByDay(sortedReadings).map(({ day, readings }) => (
                            <details className="telemetry-day" key={day}>
                                <summary className="telemetry-day__summary">
                                    <span className="telemetry-day__date">{formatDayLabel(day)}</span>
                                    <span className="telemetry-day__count">
                                        {readings.length} {readings.length === 1 ? 'reading' : 'readings'}
                                    </span>
                                    <svg className="telemetry-day__chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </summary>
                                <div className="telemetry__readings">
                                    {readings.map((plant) => (
                                        <TelemetryReading plant={plant} key={plant.id} />
                                    ))}
                                </div>
                            </details>
                        ))}
                    </div>
                </details>
            )}
        </section>
    )

}
export {TelemetryData};
