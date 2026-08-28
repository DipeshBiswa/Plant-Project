package com.plant.p.plant_p.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.plant.p.plant_p.Models.Telemetry;

@Repository
public interface TelemetryRepository extends JpaRepository<Telemetry, Long>{
    

}
