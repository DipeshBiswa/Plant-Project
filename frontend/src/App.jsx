import { useState } from 'react'
import {TelemetryData} from './TelemetryData.jsx'
import './App.css'
import { AiResponse } from './AiResponse.jsx'

function App() {
  

  return (
    <>
    <div>
      <TelemetryData />
      <div>
        <AiResponse />
      </div>
    </div>
    </>
  )
}

export default App
