export function TelemetryReading({ plant }) {
    return (
        <details className="telemetry-card">
            <summary className="telemetry-card__summary">
                <span className="telemetry-card__timestamp">
                    <span className="telemetry-card__label">Timestamp</span>
                    <span className="telemetry-card__timestamp-value">{plant.timestamp || 'Timestamp unavailable'}</span>
                </span>
                <svg className="telemetry-card__chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </summary>
            <dl className="telemetry-card__metrics">
                <div className="telemetry-card__metric">
                    <dt className="telemetry-card__label">Sunlight Amount</dt>
                    <dd className="telemetry-card__value">{plant.lux}</dd>
                </div>
                <div className="telemetry-card__metric">
                    <dt className="telemetry-card__label">Room Temperature</dt>
                    <dd className="telemetry-card__value">{plant.roomTempF}</dd>
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
    );
}
