package com.plant.p.plant_p.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.plant.p.plant_p.Models.Telemetry;

@Repository
public interface TelemetryRepository extends JpaRepository<Telemetry, Long>{
    @Query(value = """
            SELECT * FROM telemetry WHERE time::date = (SELECT MAX(timestamp::date) FROM telemetry
            )
            ORDER BY timestamp ASC
            """,nativeQuery = true)
    List<Telemetry>findAllFromLatestDay();

}
