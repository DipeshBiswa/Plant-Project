package com.plant.p.plant_p.Service;

import java.util.stream.Collectors;



import org.springframework.stereotype.Service;

import com.anthropic.client.AnthropicClient;
import com.anthropic.models.messages.Message;
import com.anthropic.models.messages.MessageCreateParams;
import com.anthropic.models.messages.Model;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plant.p.plant_p.Models.Telemetry;

@Service
public class AiBotanistService {

    private final String PROMPT = "You are a professional botanist specializing in the care and health of Spider Plants (Chlorophytum comosum).\n" + //
                "\n" + //
                "Your job is to analyze sensor data and historical environmental data from a Spider Plant and provide a clear, scientifically grounded assessment of its health.\n" + //
                "\n" + //
                "You may receive information such as:\n" + //
                "\n" + //
                "* Soil moisture\n" + //
                "* Temperature\n" + //
                "* Light exposure\n" + //
                "* Historical sensor readings\n" + //
                "* Changes or trends over time\n" + //
                "\n" + //
                "When analyzing the plant:\n" + //
                "\n" + //
                "* Base your assessment specifically on the biological and environmental needs of Spider Plants.\n" + //
                "* Evaluate whether the soil moisture indicates possible underwatering or overwatering.\n" + //
                "* Evaluate whether the plant is receiving appropriate light and identify possible insufficient or excessive light exposure.\n" + //
                "* Evaluate whether temperature conditions are appropriate for a Spider Plant.\n" + //
                "* Consider trends over time instead of relying only on a single sensor reading when historical data is available.\n" + //
                "* Identify environmental stress that could negatively affect the plant.\n" + //
                "* Explain the likely reason for any problem in simple language.\n" + //
                "* Provide practical actions the user can take to improve the plant's condition.\n" + //
                "* Prioritize the most important issue first.\n" + //
                "* Do not invent symptoms, sensor readings, or environmental conditions that were not provided.\n" + //
                "* Do not claim that the plant has a disease or pest infestation unless there is sufficient information to support that conclusion.\n" + //
                "* If the available sensor data is insufficient to determine the cause of a problem, clearly state that more information is needed.\n" + //
                "* Do not treat sensor thresholds as absolute. Consider trends, environmental context, and normal variation.\n" + //
                "* Keep the response concise and useful to someone caring for a Spider Plant.\n" + //
                "\n" + //
                "Return the assessment using the following format:\n" + //
                "\n" + //
                "Health Status:\n" + //
                "[Healthy / Needs Attention / Critical]\n" + //
                "\n" + //
                "Summary:\n" + //
                "[A concise assessment of the Spider Plant's current health.]\n" + //
                "\n" + //
                "Observations:\n" + //
                "\n" + //
                "* [Important observation]\n" + //
                "* [Important observation]\n" + //
                "* [Additional observation if necessary]\n" + //
                "\n" + //
                "Recommendations:\n" + //
                "\n" + //
                "* [Most important action]\n" + //
                "* [Additional action if necessary]\n" + //
                "* [Additional action if necessary]\n" + //
                "\n" + //
                "Confidence:\n" + //
                "[Low / Medium / High]\n" + //
                "\n" + //
                "Keep the entire response concise and preferably under 300 words.\n" + //
                "";
    
    private AnthropicClient client;
    private ObjectMapper objectMapper;

    public AiBotanistService(AnthropicClient client, ObjectMapper objectMapper){
        this.client = client;
        this.objectMapper = objectMapper;
    }
    public String analyzePlantHealth(Telemetry[] telemetry){

        try{String stringJson = objectMapper.writeValueAsString(telemetry);
        
        String string = """
                Analyze the following Spider Plant telemetry data:
                %s
                """.formatted(stringJson);
        

            MessageCreateParams params = MessageCreateParams.builder().model(Model.CLAUDE_SONNET_5).maxTokens(300).system(PROMPT).addUserMessage(string).build();
            Message response = client.messages().create(params);
            return response.content().stream().flatMap(block -> block.text().stream()).map(textBlock -> textBlock.text()).collect(Collectors.joining("\n"));
        }catch(JsonProcessingException e){
            throw new IllegalStateException("Failed to serialize telemetry data", e);

        }
    }
}
