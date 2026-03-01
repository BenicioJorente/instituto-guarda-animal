"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ClubeDoadores from "@/components/ClubeDoadores";
import WhatsappButton from "@/components/WhatsappButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  const imagensCarrossel = [
    "/images/img1.jpeg",
    "/images/img2.jpeg",
    "/images/img3.jpeg",
    "/images/img4.jpeg",
    "/images/img5.jpeg",
    "/images/img6.jpeg"
  ];

  const [indexAtual, setIndexAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexAtual((prevIndex) => (prevIndex + 1) % imagensCarrossel.length);
    }, 4000); 
    return () => clearInterval(intervalo);
  }, [imagensCarrossel.length]);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">

      <Navbar />

      <section className="relative h-[80vh] w-full flex items-center overflow-hidden">
        <img
          src="/images/home.png"
          alt="Background Hero"
          className="absolute inset-0 w-full h-full object-cover object-[50%_25%] z-0"
        />

        <div className="absolute inset-0 bg-[#A60C14]/60 z-10"></div>

        <div className="relative z-20 max-w-4xl mx-auto px-8 text-center md:text-left md:mx-20">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Resgatando a esperança.
          </h1>
          <p className="text-xl text-white/90 max-w-xl mb-10 leading-relaxed font-medium">
            Atuamos na linha de frente para dar voz a quem não pode pedir ajuda.
            Conheça nossa trajetória dedicada à proteção animal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/ajudar" className="bg-white text-[#A60C14] px-10 py-4 rounded-full font-black hover:bg-zinc-100 transition shadow-lg text-center">
              QUERO AJUDAR
            </Link>
            <Link href="/adote" className="border-2 border-white text-white px-10 py-4 rounded-full font-black hover:bg-white/10 transition text-center">
              CONHECER ANIMAIS
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          
          <div className="relative group w-full max-w-[450px] mx-auto">
            <div className="absolute -inset-4 bg-red-100 rounded-2xl rotate-3 group-hover:rotate-1 transition"></div>
            <div className="relative bg-zinc-200 aspect-square h-full max-h-[450px] w-full rounded-xl overflow-hidden shadow-xl flex items-center justify-center italic text-zinc-500">
              {imagensCarrossel.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Slide ${index}`}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
                    index === indexAtual ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="md:pt-2">
            <span className="text-red-600 font-black uppercase tracking-[0.2em] text-xs">Quem Somos</span>
            <h2 className="text-4xl font-black text-zinc-900 mt-4 mb-8 leading-tight">Nossa Trajetória de Luta e Amor</h2>
            <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
              <p>
                O <strong>Instituto Guarda Animal</strong> é uma entidade de
                assistência social que surgiu em janeiro de 2018
                para promover o resgate de animais em situação
                de vulnerabilidade social, reabilitando e tornando
                estes animais aptos para a convivência familiar e
                comunitária. Neste tempo de atuação, já foram
                realizados mais de 700 resgates e promovidas
                mais de 500 adoções.
              </p>
              <p>
                As dificuldades aumentaram significativamente
                com o início da pandemia do COVID 19 em 2020.
                Por meses nos vimos impossibilitadas de receber
                presencialmente os adotantes em potencial e a
                falta de recursos se instalou de forma geral. Ainda
                assim, os animais continuavam - e continuam -
                nas ruas precisando de ajuda, e o Instituto
                permaneceu em atividade.
                Persistimos junto ao apoio de quem nos
                acompanha e ampara a causa. Conseguimos
                realizar 126 resgates e 62 adoções no último ano.
                Somos eternamente gratas pelo apoio de cada
                um que faz parte da nossa história e o Instituto
                continuará na luta para levar dignidade à muito
                mais animais.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-600 font-black uppercase tracking-[0.2em] text-xs">Nosso Time</span>
            <h2 className="text-4xl font-black text-zinc-900 mt-4">A pessoa por trás dos resgates</h2>
            <p className="text-zinc-600 mt-4 max-w-2xl mx-auto">
              Conheça quem dedica o seu tempo e amor para transformar a realidade dos nossos amigos de quatro patas.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-center w-full max-w-sm">
              <div className="relative group w-full mb-6">
                <div className="absolute -inset-3 bg-red-100 rounded-xl rotate-3 group-hover:rotate-1 transition"></div>
                <div className="relative bg-zinc-200 w-full aspect-square rounded-xl overflow-hidden shadow-lg flex items-center justify-center italic text-zinc-500">
                  <img
                    src="/images/foto-time.jpeg"
                    alt="Nathália"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="text-xl font-bold text-zinc-900">Nathália</h4>
              <p className="text-zinc-500 text-sm mt-2 text-center px-4">
                Fundadora da ONG.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-center text-zinc-400 font-bold uppercase tracking-widest mb-16">Transparência e Impacto</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-5xl font-black text-red-600">+900</p>
              <p className="text-zinc-500 font-bold mt-2 uppercase text-xs tracking-tighter">Vidas Salvas</p>
            </div>
            <div>
              <p className="text-5xl font-black text-red-600">420</p>
              <p className="text-zinc-500 font-bold mt-2 uppercase text-xs tracking-tighter">Finais Felizes</p>
            </div>
            <div>
              <p className="text-5xl font-black text-red-600">24h</p>
              <p className="text-zinc-500 font-bold mt-2 uppercase text-xs tracking-tighter">De Dedicação</p>
            </div>
            <div>
              <p className="text-5xl font-black text-red-600">100%</p>
              <p className="text-zinc-500 font-bold mt-2 uppercase text-xs tracking-tighter">Voluntário</p>
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