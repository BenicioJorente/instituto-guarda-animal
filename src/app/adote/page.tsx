"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ClubeDoadores from "@/components/ClubeDoadores";
import WhatsappButton from "@/components/WhatsappButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function AdotePage() {
  const [animais, setAnimais] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [sexosSelecionados, setSexosSelecionados] = useState<string[]>([]);
  const [portesSelecionados, setPortesSelecionados] = useState<string[]>([]);

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const { data, error } = await supabase
          .from("animais")
          .select("*")
          .order('created_at', { ascending: false }); 

        if (error) throw error;
        if (data) setAnimais(data);
      } catch (error) {
        console.error("Erro ao carregar animais:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimais();
  }, []);

  const handleToggleFiltro = (item: string, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const animaisFiltrados = animais.filter(pet => {
    const bateTipo = filtroTipo === "Todos" || pet.tipo === filtroTipo;
    const bateSexo = sexosSelecionados.length === 0 || sexosSelecionados.includes(pet.sexo);
    const batePorte = portesSelecionados.length === 0 || portesSelecionados.some(p => pet.porte?.startsWith(p));
    return bateTipo && bateSexo && batePorte;
  });

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] md:h-[80vh] w-full bg-[#A60C14] flex items-center px-8 overflow-hidden py-16 md:py-0">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white z-10 text-center md:text-left">
            <p className="font-bold uppercase tracking-[0.2em] text-xs mb-4 opacity-90">Bem-vindo(a) ao nosso</p>
            <h1 className="text-4xl md:text-7xl font-black leading-tight uppercase mb-6">
              Site de Adoção Online
            </h1>
            <p className="text-lg opacity-90 max-w-md mx-auto md:mx-0 leading-relaxed">
              Estamos muito felizes de ter você aqui! Seu apoio é essencial para continuarmos resgatando e reabilitando esses patudinhos.
            </p>
          </div>

          <div className="relative h-[300px] md:h-[450px] flex items-center justify-center mt-10 md:mt-0 scale-75 md:scale-100">
            <div className="absolute bg-white p-3 shadow-2xl rotate-[-25deg] -translate-x-24 md:-translate-x-32 -translate-y-10 w-40 md:w-56">
              <div className="bg-zinc-200 aspect-square mb-3 overflow-hidden">
                <img src="/images/foto3.jpeg" alt="Resgate" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="absolute z-20 bg-white p-3 shadow-2xl rotate-[5deg] w-44 md:w-64 border border-zinc-50">
              <div className="bg-zinc-300 aspect-square mb-3 overflow-hidden">
                <img src="/images/foto2.jpeg" alt="Amor" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="absolute bg-white p-3 shadow-2xl rotate-[20deg] translate-x-24 md:translate-x-32 -translate-y-5 w-40 md:w-56">
              <div className="bg-zinc-200 aspect-square mb-3 overflow-hidden">
                <img src="/images/foto1.jpeg" alt="Carinho" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-[#fdfcf9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-20 text-zinc-900 uppercase">Conheça os animais</h2>

          <div className="flex flex-col md:flex-row gap-16">
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-28 space-y-10">
                <div>
                  <h3 className="text-[#00a896] font-black uppercase tracking-widest text-sm mb-6">Animais</h3>
                  <ul className="space-y-3 text-zinc-600 font-bold">
                    {["Todos", "Cães", "Gatos"].map(tipo => (
                      <li key={tipo}
                        className={`cursor-pointer hover:text-[#00a896] transition ${filtroTipo === tipo ? "text-[#00a896]" : ""}`}
                        onClick={() => setFiltroTipo(tipo)}>
                        {tipo}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[#00a896] font-black uppercase tracking-widest text-sm mb-6">Sexo</h3>
                  <div className="space-y-3 font-bold text-zinc-600">
                    {["Fêmea", "Macho"].map(sexo => (
                      <label key={sexo} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox"
                          checked={sexosSelecionados.includes(sexo)}
                          onChange={() => handleToggleFiltro(sexo, sexosSelecionados, setSexosSelecionados)}
                          className="w-4 h-4 accent-[#00a896]" /> {sexo}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[#00a896] font-black uppercase tracking-widest text-sm mb-6">Porte</h3>
                  <div className="space-y-3 font-bold text-zinc-600 text-xs">
                    {[
                      { id: "G", label: "G (mais de 25kg)" },
                      { id: "M", label: "M (até 25kg)" },
                      { id: "P", label: "P (até 10kg)" }
                    ].map(porte => (
                      <label key={porte.id} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox"
                          checked={portesSelecionados.includes(porte.id)}
                          onChange={() => handleToggleFiltro(porte.id, portesSelecionados, setPortesSelecionados)}
                          className="w-4 h-4 accent-[#00a896]" /> {porte.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              {loading ? (
                <p className="text-center font-bold text-zinc-400">Carregando animais...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {animaisFiltrados.map((pet) => (
                    <Link href={`/adote/${pet.id}`} key={pet.id} className="group cursor-pointer flex flex-col h-full">
                      <div className="bg-zinc-200 aspect-[4/5] rounded-xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-300 relative border border-zinc-100">
                        {pet.imagem_url ? (
                          <img src={pet.imagem_url} alt={pet.nome} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center italic text-zinc-400 text-xs px-4 text-center">
                            [Sem foto]
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-red-600 shadow-sm">
                          {pet.status}
                        </div>
                      </div>

                      <div className="flex flex-col flex-1">
                        <h4 className="text-2xl font-black text-zinc-900 mb-2 group-hover:text-red-600 transition uppercase leading-tight">
                          Adote {pet.nome}
                        </h4>
                        <div className="text-zinc-500 font-bold text-sm space-y-1 mb-6">
                          <p>{pet.sexo} • {pet.porte === 'M' ? 'Porte Médio' : pet.porte === 'G' ? 'Porte Grande' : 'Porte Pequeno'}</p>
                          <p>{pet.idade}</p>
                        </div>
                        <div className="mt-auto">
                          <span className="w-full h-[48px] bg-red-600 text-white font-black rounded-xl flex items-center justify-center uppercase text-[10px] tracking-widest shadow-lg group-hover:bg-red-700 transition">
                            Conhecer
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
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