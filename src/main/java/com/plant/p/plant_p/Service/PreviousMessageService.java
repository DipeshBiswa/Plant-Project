package com.plant.p.plant_p.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.plant.p.plant_p.Models.PreviousMessage;
import com.plant.p.plant_p.Repository.PreviousMessageRepository;

@Service 
public class PreviousMessageService{

    private final PreviousMessageRepository previousMessage;

    public PreviousMessageService(PreviousMessageRepository previousMessage){
        this.previousMessage = previousMessage;
    }

    public PreviousMessage createMessage(PreviousMessage message){
        return previousMessage.save(message);
    }
    public List<PreviousMessage> getAiMemory(){
        return previousMessage.findLatestAiReponse();
    }
    
}
