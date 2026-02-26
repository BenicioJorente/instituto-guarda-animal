"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  
  const mensagemGeral = encodeURIComponent("Olá! Gostaria de mais informações sobre o Instituto Guarda Animal.");
  const numeroTelefone = "67998725246"; 

  return (
    <a
      href={`https://wa.me/${numeroTelefone}?text=${mensagemGeral}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20ba5a] transition-all hover:scale-110 flex items-center justify-center"
      aria-label="Contato via WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}