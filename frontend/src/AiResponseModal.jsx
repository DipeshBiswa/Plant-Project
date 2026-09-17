import { useState } from "react";

export default function AiReponseModal({isOpen, onClose}){
    const [aiResponse, setAiResponse] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    if (!isOpen) return null;


        const getAiResponse = async () =>{
            if (isLoading) return;

            setIsLoading(true);
            setErrorMessage("");
            try{
                const response = await fetch("https://plant-project-production.up.railway.app/ai");
                if(!response.ok){
                    throw new Error("Failed to fetch AI response");
                }
                const data = await response.text();
                setAiResponse(data);
            }catch(error){
                console.error(error);
                setErrorMessage("We couldn't get an AI response. Please try again.");
            }finally{
                setIsLoading(false);
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
                <div className="ai-modal__response" role="status" aria-live="polite" aria-atomic="true" tabIndex={0}>
                    {isLoading
                        ? "AI is thinking… Please wait while your plant care response is prepared."
                        : errorMessage || aiResponse || "Ready when you are. Get your AI response for a little help caring for your plants."}
                </div>
                <footer className="ai-modal__actions">
                    <button className="ai-response__button" onClick={getAiResponse} disabled={isLoading}>
                        {isLoading ? "AI is thinking…" : errorMessage ? "Try again" : "Get AI Response"}
                    </button>
                    <button className="ai-modal__close" onClick={onClose}>Close</button>
                </footer>
            </div>
            </div>
    )


}
