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
                    throw new Error("Failed to fetch plant care insights");
                }
                const data = await response.text();
                setAiResponse(data);
            }catch(error){
                console.error(error);
                setErrorMessage("We couldn't load your plant care insights. Please try again.");
            }finally{
                setIsLoading(false);
            }
        }

    return(
            <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="ai-modal-title" onClick={(e) => e.stopPropagation()}>
                <header className="ai-modal__header">
                    <h2 id="ai-modal-title">Plant Deep Dive</h2>
                    <p className="ai-modal__description">Plant care insights based on the past three days of readings.</p>
                </header>
                <div className="ai-modal__response" role="status" aria-live="polite" aria-atomic="true" tabIndex={0}>
                    {isLoading
                        ? "Reviewing your plant's readings…"
                        : errorMessage || aiResponse || "Generate insights to see how your plant has been doing and what care it may need."}
                </div>
                <footer className="ai-modal__actions">
                    <button className="ai-response__button" onClick={getAiResponse} disabled={isLoading}>
                        {isLoading ? "Reviewing readings…" : errorMessage ? "Try again" : "Generate insights"}
                    </button>
                    <button className="ai-modal__close" onClick={onClose}>Close</button>
                </footer>
            </div>
            </div>
    )


}
