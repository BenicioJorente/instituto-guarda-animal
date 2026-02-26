import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#A60C14] text-white py-12 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 border-b border-white/10 pb-10">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div>
              <h4 className="text-xl font-black tracking-tighter uppercase">Instituto Guarda Animal</h4>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Resgatando a esperança</p>
            </div>

            <nav className="flex flex-col gap-2 text-[10px] font-black uppercase tracking-widest">
              <Link href="/" className="hover:translate-x-1 transition-transform hover:text-zinc-900">Início</Link>
              <Link href="/adote" className="hover:translate-x-1 transition-transform hover:text-zinc-900">Adote um Amigo</Link>
              <Link href="/ajudar" className="hover:translate-x-1 transition-transform hover:text-zinc-900">Como Ajudar</Link>
              <Link href="/login" className="hover:translate-x-1 transition-transform hover:text-zinc-900">Login</Link>
            </nav>

            <div className="flex flex-col gap-2 items-center md:items-start pt-2">
              <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">
                Acesse nossa rede social
              </p>
              <a 
                href="https://www.instagram.com/institutoguardaanimal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-zinc-900 transition-all flex justify-center md:justify-start"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="22" 
                  height="22" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 self-center md:self-start">
            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-right">
              <div className="flex flex-col gap-1">
                <p className="text-xs md:text-sm font-medium text-white/70 max-w-[350px] leading-relaxed">
                  Este site foi desenvolvido voluntariamente por
                  <span className="text-white font-bold"> Benício Jorente</span> para apoiar a causa animal.
                </p>
                
                <div className="flex items-center justify-center md:justify-end gap-2 text-[10px] md:text-xs text-white/50">
                  <p>Design e identidade visual por <span className="text-white font-bold">Julia Ferreira</span></p>
                  <a
                    href="https://instagram.com/juliaf.go"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                </div>
              </div>
              <img
                src="/images/logoben.png"
                alt="Logo Benício"
                className="w-16 h-16 md:w-20 md:h-20 object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>

            <a
              href="https://www.beniciojorente.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white text-red-700 hover:bg-zinc-900 hover:text-white px-6 py-3 rounded-full transition-all text-xs font-black uppercase tracking-widest shadow-xl"
            >
              Conheça meu trabalho <span className="group-hover:translate-x-2 transition-transform">→</span>
            </a>
          </div>
        </div>

        <div className="pt-8 text-center">
          <p className="text-[10px] opacity-30 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}