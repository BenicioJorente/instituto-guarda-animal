"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  nome: string;
  tipo: string;
  sexo: string;
  porte: string;
  idade: string;
  status: string;
  descricao: string;
}

export default function NovoAnimalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    tipo: "Cães",
    sexo: "Macho",
    porte: "M", 
    idade: "",
    status: "Disponível",
    descricao: ""
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      }
    };
    checkUser();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `animais/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('imagens')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('imagens')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase
        .from("animais")
        .insert([{ ...formData, imagem_url: imageUrl }]);

      if (error) throw error;

      alert("Animal cadastrado com sucesso!");
      router.push("/admin"); 
      router.refresh();

    } catch (error: any) {
      alert("Erro ao salvar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      <form onSubmit={handleSubmit} style={formStyle}>

        <div style={{ marginBottom: '20px' }}>
          <Link href="/admin" style={{ color: '#666', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
            ← Voltar para o Painel
          </Link>
        </div>

        <h1 style={{ color: '#A60C14', marginBottom: '20px' }}>NOVO ANIMAL</h1>

        <label>Nome:</label>
        <input name="nome" value={formData.nome} onChange={handleChange} required style={inputStyle} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>Tipo:</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} style={inputStyle}>
              <option value="Cães">Cães</option>
              <option value="Gatos">Gatos</option>
            </select>
          </div>
          
          <div style={{ flex: 1 }}>
            <label>Porte:</label>
            <select 
              name="porte" 
              value={formData.porte} 
              onChange={handleChange} 
              required 
              style={inputStyle}
            >
              <option value="P">Pequeno (P)</option>
              <option value="M">Médio (M)</option>
              <option value="G">Grande (G)</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label>Sexo:</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange} style={inputStyle}>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </select>
          </div>
        </div>

        <label>Idade:</label>
        <input name="idade" value={formData.idade} onChange={handleChange} style={inputStyle} />

        <label>Descrição:</label>
        <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={3} style={inputStyle} />

        <label>Foto:</label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload" style={fileButtonStyle}>
          {imageFile ? `✅ ${imageFile.name}` : "📁 CLIQUE AQUI PARA SELECIONAR A FOTO"}
        </label>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Salvando..." : "CADASTRAR ANIMAL"}
        </button>
      </form>
    </div>
  );
}

const formStyle: React.CSSProperties = { maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const inputStyle: React.CSSProperties = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', width: '100%', marginBottom: '10px', fontSize: '16px' };
const buttonStyle: React.CSSProperties = { backgroundColor: "#A60C14", color: "white", padding: "14px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: '16px', marginTop: '10px' };

const fileButtonStyle: React.CSSProperties = {
  border: '2px dashed #A60C14',
  padding: '15px',
  borderRadius: '8px',
  textAlign: 'center',
  cursor: 'pointer',
  color: '#A60C14',
  fontWeight: 'bold',
  marginBottom: '15px',
  backgroundColor: '#fff5f5',
  transition: '0.3s'
};