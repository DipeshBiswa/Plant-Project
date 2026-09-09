import { useEffect, useState} from "react";
import './AiResponse.css'

function AiResponse(){
    const [aiResponse, setAiResponse] = useState();


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
        <section className="ai-response" aria-labelledby="ai-response-title">
            <div className="ai-response__content">
                <span className="ai-response__icon" aria-hidden="true">
                    <svg viewBox="0 0 32 32" fill="none">
                        <path d="M8 25c2-8 7-13 15-17M8 22C4 10 13 4 27 5c1 14-7 22-19 17Z" />
                        <path d="M7 4v4M5 6h4m16 17v6m-3-3h6" />
                    </svg>
                </span>
                <p className="section-eyebrow">Your AI plant assistant</p>
                <h2 id="ai-response-title">A little plant wisdom.</h2>
                <p className="ai-response__description">Make a little space for thoughtful plant care.</p>
                <button className="ai-response__button" onClick={getAiResponse}>
                    Get Ai Response
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14m-5-5 5 5-5 5" />
                    </svg>
                </button>
                <p className="ai-response__reading">
                    <span className="ai-response__text">{aiResponse}</span>
                </p>
            </div>
        </section>
    )
}

export {AiResponse}
