"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  const menuLinks = [
    { name: "Início", href: "/" },
    { name: "Adote um Amigo", href: "/adote" },
    { name: "Como ajudar", href: "/ajudar" },
    { name: "Login", href: "/login" },
  ];

  return (
    <nav className="sticky top-0 z-[999] w-full bg-white border-b border-zinc-100 shadow-sm py-2">
      <div className="flex items-center justify-between px-6 max-w-6xl mx-auto">

        <Link href="/" className="flex items-center transition-transform hover:scale-105">
          <img
            src="/images/ong-logo.png"
            alt="Logo Instituto Guarda Animal"
            className="h-20 w-auto object-contain" 
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {menuLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-widest transition ${
                  isActive 
                    ? "text-red-600" // Cor fixa se estiver na página
                    : "text-zinc-600 hover:text-red-600" // Cor padrão com hover
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-red-600"
          aria-label="Menu"
        >
          {isOpen ? (
            <span className="text-2xl font-light">✕</span>
          ) : (
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-red-600"></div>
              <div className="w-6 h-0.5 bg-red-600"></div>
              <div className="w-6 h-0.5 bg-red-600"></div>
            </div>
          )}
        </button>
      </div>

      <div className={`
        md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-zinc-50
        ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
      `}>
        <div className="flex flex-col p-6 gap-4">
          {menuLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-black uppercase tracking-widest border-b border-zinc-50 pb-2 ${
                  isActive ? "text-red-600" : "text-zinc-900 hover:text-red-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}