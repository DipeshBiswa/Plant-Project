import { useRef } from "react";

export default function AiReponseModal(){
    const modalRef = useRef(null);

    const openModal = () => {
        modalRef.current?.showModal();
    };
    const closeModal = () =>{
        modalRef.current?.close();
    };
}