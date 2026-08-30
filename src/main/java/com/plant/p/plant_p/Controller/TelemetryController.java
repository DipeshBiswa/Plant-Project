package com.plant.p.plant_p.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plant.p.plant_p.Models.Telemetry;
import com.plant.p.plant_p.Service.TelemetryService;

@RequestMapping("/telemetry")
@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class TelemetryController {
    
    private TelemetryService telemetryService;
    public TelemetryController(TelemetryService telemetryService){
        this.telemetryService = telemetryService;

    }
    @PostMapping("")
    public ResponseEntity<Telemetry> createTelemetry(@RequestBody Telemetry telemetry){
        Telemetry t = telemetryService.createTelemetry(telemetry);
        return new ResponseEntity<>(t,HttpStatus.CREATED);

    }
    @GetMapping("")
    public ResponseEntity<Telemetry[]> getTelemetry(){
        Telemetry[] allTelemetry = telemetryService.getTelemetry();
        return new ResponseEntity<Telemetry[]>(allTelemetry, HttpStatus.OK);

    }
}
