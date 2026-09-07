import { useEffect, useState } from "react";
import './TelemetryData.css';
import { formatDayLabel, groupReadingsByDay } from './telemetryDays.js';

function TelemetryData(){
    const [data, setPlantData] = useState([]);
    

    useEffect(() => {
        async function getPlantData(){
            try{
                const response = await fetch("http://localhost:8080/telemetry");
                if(!response.ok){
                    throw new Error("Failed to fetch plant data");
                }
                const data = await response.json();
                setPlantData(data);
            }catch(error){
                console.error(error);
            }

        }
        getPlantData()
    }, []);

    return(
        <section className="telemetry" aria-labelledby="telemetry-title">
            <header className="telemetry__header">
                <div>
                    <p className="section-eyebrow">The environment</p>
                    <h2 id="telemetry-title">Plant Data</h2>
                    <p className="telemetry__description">Open a reading to see your plant’s environmental details.</p>
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
            <div className="telemetry__days">
                {groupReadingsByDay(data).map(({ day, readings }) => (
                    <details className="telemetry-day" key={day} open>
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
                            {readings.map((plant) =>(
                                <details className="telemetry-card" key={plant.id}>
                                    <summary className="telemetry-card__summary">
                                        <span className="telemetry-card__heading">
                                            <span className="telemetry-card__id">ID: {plant.id}</span>
                                            <span className="telemetry-card__timestamp">
                                                <span className="telemetry-card__label">Timestamp</span>
                                                <span className="telemetry-card__timestamp-value">{plant.timestamp}</span>
                                            </span>
                                        </span>
                                        <svg className="telemetry-card__chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </summary>
                                    <dl className="telemetry-card__metrics">
                                        <div className="telemetry-card__metric">
                                            <dt className="telemetry-card__label">Sunlight Amount</dt>
                                            <dd className="telemetry-card__value">{plant.sunlight}</dd>
                                        </div>
                                        <div className="telemetry-card__metric">
                                            <dt className="telemetry-card__label">Room Temperature</dt>
                                            <dd className="telemetry-card__value">{plant.roomTemp}</dd>
                                        </div>
                                        <div className="telemetry-card__metric">
                                            <dt className="telemetry-card__label">Humidity</dt>
                                            <dd className="telemetry-card__value">{plant.humidity}</dd>
                                        </div>
                                        <div className="telemetry-card__metric">
                                            <dt className="telemetry-card__label">Soil Moisture</dt>
                                            <dd className="telemetry-card__value">{plant.soilMoisture}</dd>
                                        </div>
                                    </dl>
                                </details>
                            ))}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    )

}
export {TelemetryData};
