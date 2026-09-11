package com.plant.p.plant_p.Models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "telemetry")
public class Telemetry { 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float lux;
    private String soilMoisture;
    private float roomTempF;
    private float humidity;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    

    //day/month/year hour:mm:ss
    public Telemetry(){}
    public Telemetry(float sunlight, String soilMoisture, float roomTemp, float humidity, LocalDateTime timestamp){
        this.lux = sunlight;
        this.soilMoisture = soilMoisture;
        this.roomTempF = roomTemp;
        this.humidity = humidity;
        this.timestamp = timestamp;
    }
}
