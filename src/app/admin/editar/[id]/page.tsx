"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
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

export default function EditarAnimalPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; 

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");

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
    const fetchAnimal = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from("animais")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("Erro ao carregar animal: " + error.message);
        router.push("/admin");
        return;
      }

      if (data) {
        setFormData({
          nome: data.nome || "",
          tipo: data.tipo || "Cães",
          sexo: data.sexo || "Macho",
          porte: data.porte || "M",
          idade: data.idade || "",
          status: data.status || "Disponível",
          descricao: data.descricao || ""
        });
        setCurrentImageUrl(data.imagem_url || "");
      }
      setLoading(false);
    };

    fetchAnimal();
  }, [id, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = currentImageUrl;

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
        .update({
          nome: formData.nome,
          tipo: formData.tipo,
          sexo: formData.sexo,
          porte: formData.porte,
          idade: formData.idade,
          status: formData.status,
          descricao: formData.descricao,
          imagem_url: imageUrl
        })
        .eq("id", id);

      if (error) throw error;

      alert("Dados atualizados com sucesso!");
      window.location.href = "/admin";

    } catch (error: any) {
      console.error("Erro na atualização:", error);
      alert("Erro ao atualizar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Carregando dados...</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit} style={formStyle}>
        
        <div style={{ marginBottom: '20px' }}>
          <Link href="/admin" style={{ color: '#666', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
            ← Cancelar e Voltar
          </Link>
        </div>

        <h1 style={{ color: '#3b82f6', marginBottom: '20px', fontSize: '24px' }}>EDITAR ANIMAL</h1>

        <label style={labelStyle}>Nome:</label>
        <input name="nome" value={formData.nome} onChange={handleChange} required style={inputStyle} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Tipo:</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} style={inputStyle}>
              <option value="Cães">Cães</option>
              <option value="Gatos">Gatos</option>
            </select>
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Porte:</label>
            <select name="porte" value={formData.porte} onChange={handleChange} style={inputStyle}>
              <option value="P">Pequeno (P)</option>
              <option value="M">Médio (M)</option>
              <option value="G">Grande (G)</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Sexo:</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange} style={inputStyle}>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
                <label style={labelStyle}>Idade:</label>
                <input name="idade" value={formData.idade} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
                <label style={labelStyle}>Status:</label>
                <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
                    <option value="Disponível">Disponível</option>
                    <option value="Adotado">Adotado</option>
                    <option value="Padrinho">Padrinho</option>
                </select>
            </div>
        </div>

        <label style={labelStyle}>Descrição:</label>
        <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={3} style={inputStyle} />

        <div style={{ marginTop: '10px' }}>
            <label style={labelStyle}>Foto Atual:</label>
            {currentImageUrl && (
                <div style={{ marginBottom: '15px' }}>
                    <img src={currentImageUrl} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px', border: '2px solid #ddd' }} />
                </div>
            )}
            
            <label style={labelStyle}>Alterar Foto (opcional):</label>
            
            <label style={fileUploadContainer}>
                <span style={{ fontSize: '18px' }}>📂</span> 
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                   {imageFile ? imageFile.name.toUpperCase() : "CLIQUE AQUI PARA SELECIONAR A FOTO"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                  style={{ display: 'none' }}
                />
            </label>
        </div>

        <button type="submit" disabled={saving} style={buttonStyle}>
          {saving ? "Salvando Alterações..." : "SALVAR ALTERAÇÕES"}
        </button>
      </form>
    </div>
  );
}

const labelStyle = { fontWeight: 'bold', fontSize: '13px', color: '#444', marginBottom: '5px', display: 'block' };
const formStyle: React.CSSProperties = { maxWidth: '500px', margin: '0 auto', backgroundColor: 'white', padding: '25px', borderRadius: '25px', display: 'flex', flexDirection: 'column', gap: '2px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' };
const inputStyle: React.CSSProperties = { padding: '12px', borderRadius: '10px', border: '1px solid #eee', width: '100%', marginBottom: '12px', fontSize: '15px', backgroundColor: '#fdfdfd' };
const buttonStyle: React.CSSProperties = { backgroundColor: "#3b82f6", color: "white", padding: "16px", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", fontSize: '14px', marginTop: '20px', letterSpacing: '1px' };

const fileUploadContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '20px',
    border: '2px dashed #A60C14',
    borderRadius: '15px',
    cursor: 'pointer',
    color: '#A60C14',
    textAlign: 'center',
    marginTop: '5px',
    transition: 'all 0.2s ease'
};