"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ClubeDoadores from "@/components/ClubeDoadores";
import WhatsappButton from "@/components/WhatsappButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function ComoAjudarPage() {
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [doacaoAtiva, setDoacaoAtiva] = useState<{ valor: string, desc: string } | null>(null);

  const linkWhatsappVoluntario = "https://wa.me/67998725246?text=Olá!%20Vi%20o%20site%20do%20Instituto%20Guarda%20Animal%20e%20tenho%20interesse%20em%20ser%20voluntário.%20Como%20funciona%20o%20processo?";

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Navbar />

      <section className="relative h-[80vh] w-full flex items-center px-8 text-white text-center overflow-hidden">
        <img
          src="/images/img-hero-ajuda.jpg"
          alt="Fundo Como Ajudar"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-[#A60C14]/65 z-10"></div>

        <div className="relative z-20 max-w-4xl mx-auto">
          <p className="font-bold uppercase tracking-[0.3em] text-xs mb-6 opacity-80">Sua ajuda salva vidas</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-8">
            Como você pode nos ajudar?
          </h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
            O Instituto Guarda Animal depende exclusivamente de doações. Cada contribuição é um passo a mais na recuperação de um animal resgatado.
          </p>
        </div>
      </section>

      <section className="py-24 px-8 bg-[#fdfcf9]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card PIX */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-zinc-100 text-center flex flex-col items-center h-full">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-2xl mb-6 flex-shrink-0">📱</div>
            <h3 className="text-2xl font-black uppercase mb-4 text-zinc-900">Doação via PIX</h3>
            <p className="text-zinc-500 font-bold text-sm mb-6">Use nossa chave CNPJ para doações rápidas e seguras.</p>
            <div className="bg-zinc-50 p-4 rounded-xl border border-dashed border-zinc-300 w-full mb-6">
              <p className="text-xs text-zinc-400 uppercase font-black mb-1 tracking-widest">Chave CNPJ</p>
              <p className="text-zinc-800 font-bold select-all">37.912.316/0001-60</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText("37.912.316/0001-60");
                alert("Chave Pix copiada!");
              }}
              className="bg-teal-500 text-white font-black py-3 px-8 rounded-xl hover:bg-teal-600 transition w-full mt-auto"
            >
              COPIAR CHAVE
            </button>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-zinc-100 text-center flex flex-col items-center h-full">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mb-6 flex-shrink-0">📦</div>
            <h3 className="text-2xl font-black uppercase mb-4 text-zinc-900">Doar Mantimentos</h3>
            <p className="text-zinc-500 font-bold text-sm mb-6">Precisamos constantemente de ração, remédios e materiais de limpeza.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li className="text-xs font-bold text-zinc-600 flex items-center gap-2">✓ Ração para Cães e Gatos</li>
              <li className="text-xs font-bold text-zinc-600 flex items-center gap-2">✓ Tapetes Higiênicos</li>
              <li className="text-xs font-bold text-zinc-600 flex items-center gap-2">✓ Água Sanitária e Detergente</li>
            </ul>
            <button
              onClick={() => setMostrarMapa(true)}
              className="border-2 border-red-600 text-red-600 font-black py-3 px-8 rounded-xl hover:bg-red-50 transition w-full uppercase text-xs mt-auto"
            >
              Ver Pontos de Coleta
            </button>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-zinc-100 text-center flex flex-col items-center h-full">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-2xl mb-6 flex-shrink-0">🤝</div>
            <h3 className="text-2xl font-black uppercase mb-4 text-zinc-900">Seja Voluntário</h3>
            <p className="text-zinc-500 font-bold text-sm mb-6">Doe seu tempo ajudando nos cuidados diários ou em nossos eventos.</p>
            <p className="text-zinc-400 text-xs italic mb-6 leading-relaxed">"O trabalho voluntário é o combustível que move o nosso instituto todos os dias."</p>
            <a
              href={linkWhatsappVoluntario}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 text-white font-black py-3 px-8 rounded-xl hover:bg-black transition w-full uppercase text-xs mt-auto text-center"
            >
              Quero me inscrever
            </a>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {mostrarMapa && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[40px] p-6 md:p-8 max-w-2xl w-full shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setMostrarMapa(false)}
                className="absolute top-4 right-4 z-[110] bg-zinc-100 w-10 h-10 rounded-full text-zinc-900 font-black flex items-center justify-center hover:bg-zinc-200 shadow-sm transition-colors"
              >
                ✕
              </button>

              <div className="overflow-y-auto pr-2 custom-scrollbar">
                <div className="text-center mb-6 pr-8 ml-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">Nossos Pontos de Coleta</h3>
                  <p className="text-xs font-bold text-zinc-400 uppercase mt-1">Encontre o local mais próximo de você</p>
                </div>

                <div className="w-full aspect-video min-h-[200px] md:max-h-[300px] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-100 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.0!2d-54.61!3d-20.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDI3JzM2LjAiUyA1NMKwMzYnMzYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div className="mt-6 flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl">
                  <div className="bg-red-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0">📍</div>
                  <div>
                    <p className="text-sm font-black uppercase">Clínica Veterinária Bourgelat</p>
                    <p className="text-xs text-zinc-500 font-bold">Avenida Mato Grosso, 1291 - Centro, Campo Grande - MS</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="py-20 bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto px-8">
          <p className="text-center text-zinc-400 font-black uppercase tracking-[0.3em] text-[10px] mb-12">Transparência e Impacto</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-black text-red-600">+900</p>
              <p className="text-[10px] font-black text-zinc-400 uppercase mt-2">Vidas Salvas</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-red-600">420</p>
              <p className="text-[10px] font-black text-zinc-400 uppercase mt-2">Finais Felizes</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-red-600">24h</p>
              <p className="text-[10px] font-black text-zinc-400 uppercase mt-2">De Dedicação</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-red-600">100%</p>
              <p className="text-[10px] font-black text-zinc-400 uppercase mt-2">Voluntário</p>
            </div>
          </div>
        </div>
      </section>

      <ClubeDoadores />
      <Footer />
      <WhatsappButton />
      <ScrollToTopButton />

    </div>
  );
}