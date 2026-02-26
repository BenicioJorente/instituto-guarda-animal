"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const [animais, setAnimais] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    
    const checkUserAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      const { data } = await supabase
        .from("animais")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setAnimais(data);
      setLoading(false);
    };

    checkUserAndFetch();
    return () => window.removeEventListener("resize", handleResize);
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    const confirmDelete = confirm("Tem certeza que deseja excluir este animal?");
    if (!confirmDelete) return;
    try {
      if (imageUrl) {
        const fileName = imageUrl.split('/').pop();
        await supabase.storage.from('imagens').remove([`animais/${fileName}`]);
      }
      await supabase.from("animais").delete().eq("id", id);
      alert("Animal removido com sucesso!");
      setAnimais(prev => prev.filter(animal => animal.id !== id));
    } catch (error: any) {
      alert("Erro ao excluir: " + error.message);
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Carregando painel...</div>;

  return (
    <div style={{ 
      padding: isMobile ? '10px' : '40px', 
      backgroundColor: '#f4f4f4', 
      minHeight: '100vh', 
      fontFamily: 'sans-serif' 
    }}>
      <div style={{
        ...containerStyle,
        padding: isMobile ? '15px' : '30px', 
      }}>
        
        <div style={{
          ...headerStyle,
          flexDirection: isMobile ? 'column' : 'row', 
          gap: isMobile ? '20px' : '0',
          alignItems: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <div>
            <h1 style={{ color: '#A60C14', margin: 0, fontSize: isMobile ? '20px' : '32px' }}>
              PAINEL DE CONTROLE
            </h1>
            <button onClick={handleLogout} style={btnLogoutStyle}>
              ← Sair da conta
            </button>
          </div>
          
          <Link href="/admin/novo" style={{ width: isMobile ? '100%' : 'auto' }}>
            <button style={{ 
              ...btnNovoStyle, 
              width: isMobile ? '100%' : 'auto', 
              padding: isMobile ? '15px' : '12px 24px' 
            }}>
              + CADASTRAR ANIMAL
            </button>
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={theadStyle}>
                <th style={thStyle}>Foto</th>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>Tipo</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {animais.map((pet) => (
                <tr key={pet.id} style={trStyle}>
                  <td style={tdStyle}>
                    <img 
                      src={pet.imagem_url || '/placeholder.png'} 
                      alt={pet.nome} 
                      style={imgStyle} 
                    />
                  </td>
                  <td style={tdStyle}><strong>{pet.nome}</strong></td>
                  <td style={tdStyle}>{pet.tipo}</td>
                  <td style={tdStyle}>
                    <span style={{ 
                      ...statusBadge, 
                      backgroundColor: pet.status === 'Adotado' ? '#e5e7eb' : '#fff5f5',
                      color: pet.status === 'Adotado' ? '#4b5563' : '#A60C14',
                      border: pet.status === 'Adotado' ? '1px solid #d1d5db' : '1px solid #ffcccc'
                    }}>
                      {pet.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link href={`/admin/editar/${pet.id}`}>
                        <button style={btnEditarStyle}>Editar</button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(pet.id, pet.imagem_url)}
                        style={btnExcluirStyle}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {animais.length === 0 && (
            <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Nenhum animal cadastrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = { maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' };
const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #f4f4f4', paddingBottom: '20px' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' };
const theadStyle: React.CSSProperties = { textAlign: 'left', borderBottom: '2px solid #f4f4f4' };
const thStyle: React.CSSProperties = { padding: '12px' };
const tdStyle: React.CSSProperties = { padding: '12px' };
const trStyle: React.CSSProperties = { borderBottom: '1px solid #f9f9f9' };
const imgStyle: React.CSSProperties = { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#eee' };
const statusBadge: React.CSSProperties = { padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' };
const btnNovoStyle = { backgroundColor: "#00a896", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" as const };
const btnExcluirStyle = { backgroundColor: "#A60C14", color: "white", padding: "8px 14px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" as const, fontSize: '12px' };
const btnEditarStyle = { backgroundColor: "#3b82f6", color: "white", padding: "8px 14px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" as const, fontSize: '12px' };
const btnLogoutStyle = { backgroundColor: "transparent", color: "#999", border: "none", cursor: "pointer", fontSize: "13px", textDecoration: "underline", marginTop: "5px", padding: 0 };