"use client";
import React, { useState } from "react";

interface OpcaoDoacao {
  valor: string;
  desc: string;
}

export default function ClubeDoadores() {
  const [doacaoAtiva, setDoacaoAtiva] = useState<OpcaoDoacao | null>(null);

  const opcoes = [
    { valor: "5", desc: "Você ajuda a garantir um futuro melhor para animais resgatados." },
    { valor: "15", desc: "Você contribui com medicamentos e curativos para a recuperação." },
    { valor: "30", desc: "Você ajuda nos cuidados dos animais resgatados. Faça a diferença!" },
    { valor: "45", desc: "Você proporciona os cuidados básicos de entrada hospitalar." }
  ];

  return (
    <>
      <section className="bg-[#f0b500] py-24 px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="bg-[#fcebb6] p-6 rounded-2xl max-w-xl mx-auto mb-16 shadow-sm text-center">
            <p className="text-zinc-800 font-bold leading-relaxed">
              O que importa não é o quanto você doa, mas o quanto você acredita que juntos podemos mudar destinos! <span className="text-red-700">Faça parte do clube de doadores do Instituto Guarda Animal</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {opcoes.map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
                <div className="w-14 h-14 bg-[#e6f7f5] rounded-full mb-6 flex items-center justify-center text-[#00a896] text-xl">❤</div>
                <h5 className="text-3xl font-black text-zinc-900 mb-4">R${item.valor}<span className="text-sm font-bold text-zinc-400">/mês</span></h5>
                <p className="text-zinc-500 font-bold text-xs mb-8 leading-relaxed min-h-[60px]">{item.desc}</p>

                <button
                  onClick={() => setDoacaoAtiva(item)}
                  className="bg-[#00a896] text-white font-black py-3 px-8 rounded-xl hover:bg-[#008d7e] transition uppercase text-xs w-full shadow-lg shadow-teal-100"
                >
                  DOAR AGORA
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setDoacaoAtiva({ valor: "Livre", desc: "Sua doação espontânea ajuda muito nossos animais." })}
              className="bg-zinc-900 text-white font-black py-4 px-12 rounded-xl hover:bg-black transition uppercase text-sm tracking-widest shadow-2xl"
            >
              DOAR OUTROS VALORES!
            </button>
          </div>
        </div>
      </section>

      {doacaoAtiva && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] p-8 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setDoacaoAtiva(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 font-bold"
            >
              ✕
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
                {doacaoAtiva.valor === "Livre" ? "Valor Livre" : `Apoiar com R$${doacaoAtiva.valor}`}
              </h3>

              <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-3xl p-6 my-6">
                <div className="w-44 h-44 bg-white mx-auto mb-4 rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
                  <img
                    src="/images/qrcode-ong.png" 
                    alt="QR Code Pix Instituto Guarda Animal"
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="bg-amber-100 border border-amber-200 rounded-xl p-3">
                  <p className="text-[10px] font-black text-amber-800 uppercase leading-tight">
                    Atenção: Após escanear, digite manualmente o valor de
                    <span className="block text-sm mt-1">{doacaoAtiva.valor === "Livre" ? "Qualquer Valor" : `R$ ${doacaoAtiva.valor}`}</span>
                  </p>
                </div>
              </div>

              <div className="bg-zinc-50 p-4 rounded-2xl mb-6">
                <p className="text-[10px] font-black text-zinc-400 uppercase mb-2 text-left">Chave CNPJ</p>
                <div className="flex items-center justify-between bg-white border border-zinc-100 p-3 rounded-xl">
                  <span className="text-xs font-bold text-zinc-800">37.912.316/0001-60</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("37.912.316/0001-60");
                      alert("Pix copiado!");
                    }}
                    className="text-[#00a896] font-black text-[10px] uppercase"
                  >
                    Copiar
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
                {doacaoAtiva.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}