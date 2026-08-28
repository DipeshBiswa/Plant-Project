package com.plant.p.plant_p.Models;

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
    private float sunlight;
    private int soilMoisture;
    private float roomTemp;
    private double humidity;
    
    public Telemetry(){}
    public Telemetry(float sunlight, int soilMoisture, float roomTemp, double humidity){
        this.sunlight = sunlight;
        this.soilMoisture = soilMoisture;
        this.roomTemp = roomTemp;
        this.humidity = humidity;
    }
}
