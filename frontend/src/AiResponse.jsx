import { useEffect, useState} from "react";

function AiResponse(){
    const [aiResponse, setAiResponse] = useState();

    useEffect(()=>{
        async function getAiResponse(){
            try{
                const response = await fetch("http://localhost:8080/Ai");
                if(!response.ok){
                    throw new Error("Failed to fetch Ai response");
                }
                const data = await response.json();
                setAiResponse(data);
            }catch(error){
                console.error(error);
            }
        }
        getAiResponse();
    }, []);

    return(
        <>
        <p>Ai Response: {aiResponse}</p>
        </>
    )
}
export {AiResponse}