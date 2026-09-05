package com.plant.p.plant_p.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plant.p.plant_p.Models.Telemetry;
import com.plant.p.plant_p.Service.AiBotanistService;
import com.plant.p.plant_p.Service.TelemetryService;

@RestController
@RequestMapping("/Ai")
public class AiBotanistController {

    private final AiBotanistService aiService;
    private final TelemetryService telemetryService;

    public AiBotanistController(AiBotanistService aiService, TelemetryService telemetryService){
        this.aiService = aiService;
        this.telemetryService = telemetryService;
    }

    @GetMapping("")
    public ResponseEntity<String> getAiResponse(){
        List<Telemetry> telemetries = telemetryService.getDailyTelemetry();
        String aiReponse = aiService.analyzePlantHealth(telemetries);
        return new ResponseEntity<String>(aiReponse, HttpStatus.OK);
    }
    
}
