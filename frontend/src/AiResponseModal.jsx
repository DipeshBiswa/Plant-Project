import { useState } from "react";

export default function AiReponseModal({isOpen, onClose}){
    const [aiResponse, setAiResponse] = useState();
    if (!isOpen) return null;


        const getAiResponse = async () =>{
            try{
                const response = await fetch("http://localhost:8080/ai");
                if(!response.ok){
                    throw new Error("Failed to fetch Ai response");
                }
                const data = await response.text();
                setAiResponse(data);
            }catch(error){
                console.error(error);
            }
        }

    return(
        <div>
            <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={getAiResponse}>Get AI Response</button>
            <h2> Ai Respons: {aiResponse}e</h2>
            <button onClick={onClose}>Close</button>
            </div>
            </div>
        </div>
    )


}
