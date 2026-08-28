package com.plant.p.plant_p.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.plant.p.plant_p.Models.Telemetry;
import com.plant.p.plant_p.Repository.TelemetryRepository;

@Service
public class TelemetryService {
    @Autowired
    private TelemetryRepository telemetryRepository;
    
    public TelemetryService(TelemetryRepository telemetryRepository){
        this.telemetryRepository = telemetryRepository;
    }

    public Telemetry createTelemetry(float sunlight, int soilMoisture, float roomTemp, double humidity){
        Telemetry telemetry = new Telemetry(sunlight, soilMoisture, roomTemp, humidity);
        return telemetryRepository.save(telemetry);

    }


    
}
