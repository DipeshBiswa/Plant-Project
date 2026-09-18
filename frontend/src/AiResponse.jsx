import { useState} from "react";
import AiReponseModal from "./AiResponseModal.jsx";
import './AiResponse.css'

function AiResponse(){
    const [openModal, setModalOpen] = useState(false);

    return(
        <section className="ai-response" aria-labelledby="ai-response-title">
            <div className="ai-response__content">
                <h2 id="ai-response-title">Plant Deep Dive</h2>
                <p className="ai-response__description">Plant care insights based on the past three days of readings.</p>
                <button className="ai-response__button" onClick={() => setModalOpen(true)}>
                    View insights
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14m-5-5 5 5-5 5" />
                    </svg>
                </button>
                <AiReponseModal isOpen={openModal} onClose={() => setModalOpen(false)} />
            </div>
        </section>
    )
}

export {AiResponse}
