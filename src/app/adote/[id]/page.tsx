"use client";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 
import { supabase } from "@/lib/supabase"; 
import ClubeDoadores from "@/components/ClubeDoadores";

export default function DetalhesAnimal({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const idDaUrl = resolvedParams.id;

  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      const { data, error } = await supabase
        .from("animais")
        .select("*")
        .eq("id", idDaUrl)
        .single();

      if (data) setPet(data);
      setLoading(false);
    };

    fetchPet();
  }, [idDaUrl]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-zinc-400">Carregando...</div>;
  }

  if (!pet) {
    return (
      <>
        <Navbar />
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 bg-[#fdfcf9]">
          <h1 className="font-black uppercase text-2xl text-zinc-900">Animal não encontrado</h1>
          <Link href="/adote" className="bg-red-600 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest">
            Voltar para a lista
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfcf9] font-sans text-zinc-900 flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto py-4 px-8 pb-20 flex-grow">
        <Link href="/adote" className="inline-flex items-center gap-2 text-red-600 font-black uppercase text-[10px] tracking-widest mb-4 hover:translate-x-[-4px] transition-transform">
          ← Voltar para listagem
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <div className="w-full max-w-[350px] mx-auto md:mx-0">
            <div className="bg-zinc-200 aspect-square rounded-3xl overflow-hidden shadow-xl border border-zinc-100">
              {pet.imagem_url ? (
                <img src={pet.imagem_url} alt={pet.nome} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 italic">Sem foto</div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-3">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {pet.status || "Disponível"}
              </span>
              <h1 className="text-3xl md:text-4xl font-black uppercase text-zinc-900 mt-2 leading-none">
                {pet.nome}
              </h1>
              <p className="text-zinc-400 font-bold mt-1 uppercase text-xs tracking-tight">{pet.tipo} • Sem raça definida (SRD)</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-sm text-center">
                <p className="text-[9px] font-black text-zinc-400 uppercase">Sexo</p>
                <p className="font-bold text-zinc-800 text-sm">{pet.sexo}</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-sm text-center">
                <p className="text-[9px] font-black text-zinc-400 uppercase">Porte</p>
                <p className="font-bold text-zinc-800 text-sm">{pet.porte}</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-sm text-center">
                <p className="text-[9px] font-black text-zinc-400 uppercase">Idade</p>
                <p className="font-bold text-zinc-800 text-sm">{pet.idade}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-zinc-100 shadow-sm mb-4">
              <h3 className="font-black uppercase text-[10px] mb-1 text-red-600 tracking-widest">Sobre {pet.nome}</h3>
              <p className="text-zinc-600 leading-relaxed text-sm font-medium">
                {pet.descricao || `${pet.nome} está esperando por um lar amoroso!`}
              </p>
            </div>

            <a
              href={`https://wa.me/67998725246?text=Olá! Gostaria de saber mais informações sobre a adoção do ${pet.nome}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[52px] bg-[#25D366] text-white font-black rounded-2xl hover:opacity-90 transition flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg shadow-green-100"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.544.916 3.21 1.398 4.904 1.399 5.312 0 9.636-4.322 9.639-9.635.001-2.574-1.001-4.994-2.823-6.816-1.821-1.822-4.241-2.825-6.816-2.826-5.315 0-9.638 4.323-9.64 9.638-.001 1.83.479 3.619 1.389 5.176l-1.011 3.692 3.798-.997z" />
              </svg>
              Quero adotar o {pet.nome}
            </a>
          </div>
        </div>
      </main>

      <ClubeDoadores />
      <Footer />
    </div>
  );
}