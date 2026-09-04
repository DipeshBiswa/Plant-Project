package com.plant.p.plant_p.Service;

import java.util.List;

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

    public Telemetry createTelemetry(Telemetry telemetry){
        return telemetryRepository.save(telemetry);

    }
    public Telemetry[] getTelemetry(){
        java.util.List<Telemetry> t = telemetryRepository.findAll();
        Telemetry[] telemetryArray = t.toArray(new Telemetry[0]);
        return telemetryArray;

    }
    public List<Telemetry> getDailyTelemetry(){
        return telemetryRepository.findAllFromLatestDay();
    }


    
}
