import {TelemetryData} from './TelemetryData.jsx'
import './App.css'
import { AiResponse } from './AiResponse.jsx'

function App() {
  return (
    <div className="plant-dashboard">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <span className="dashboard-brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M16 26V15M16 20C8 20 5 15 6 8c7 0 10 4 10 12ZM16 15C16 8 20 5 27 5c0 7-4 11-11 10Z" />
            </svg>
          </span>
          <span className="dashboard-brand__name">LeafLink</span>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-intro" aria-labelledby="dashboard-title">
          <div>
            <p className="section-caption">Your plant at a glance</p>
            <h1 id="dashboard-title">How is your plant doing?</h1>
            <p className="dashboard-plant">
              <span className="dashboard-plant__label">Your plant:</span>
              <strong className="dashboard-plant__name">Spider plant</strong>
            </p>
          </div>
          <svg className="dashboard-sprig" viewBox="0 0 150 150" fill="none" aria-hidden="true">
            <path d="M50 136c21-29 31-61 37-108" />
            <path d="M65 112C36 112 25 96 24 76c28 0 43 13 41 36ZM77 83C51 80 41 62 45 42c25 6 36 20 32 41ZM83 57C77 30 88 12 106 9c8 22 0 41-23 48ZM72 95c3-29 23-43 47-40-2 25-17 40-47 40ZM56 125c11-25 34-30 57-20-11 23-31 29-57 20Z" />
          </svg>
        </section>

        <div className="dashboard-grid">
          <TelemetryData />
          <div className="dashboard-insights">
            <AiResponse />
          </div>
        </div>
      </main>

    </div>
  )
}

export default App
