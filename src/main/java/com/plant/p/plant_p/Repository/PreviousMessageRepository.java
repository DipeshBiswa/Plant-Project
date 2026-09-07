package com.plant.p.plant_p.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.plant.p.plant_p.Models.PreviousMessage;

@Repository 
public interface PreviousMessageRepository extends JpaRepository<PreviousMessage, Long>{
    @Query(value = """
            SELECT * FROM message WHERE timestamp::date = (SELECT MAX(timestamp::date) FROM message
            )
            ORDER BY timestamp ASC
            """, nativeQuery=true)
    List<PreviousMessage>findLatestAiReponse();

    
}
