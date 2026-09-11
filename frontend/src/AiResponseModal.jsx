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
            <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="ai-modal-title" onClick={(e) => e.stopPropagation()}>
                <header className="ai-modal__header">
                    <p className="section-eyebrow">Your AI plant assistant</p>
                    <h2 id="ai-modal-title">A little plant wisdom.</h2>
                    <p className="ai-modal__description">Thoughtful care for your growing space.</p>
                </header>
                <div className="ai-modal__response" aria-live="polite" tabIndex={0}>
                    {aiResponse || "Ready when you are. Get your AI response for a little help caring for your plants."}
                </div>
                <footer className="ai-modal__actions">
                    <button className="ai-response__button" onClick={getAiResponse}>Get AI Response</button>
                    <button className="ai-modal__close" onClick={onClose}>Close</button>
                </footer>
            </div>
            </div>
    )


}
