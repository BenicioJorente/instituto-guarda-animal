"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert("Erro ao entrar: " + error.message);
        } else {
            router.push("/admin");
        }
        setLoading(false);
    };

    return (
        <div style={containerStyle}>
            <div style={formStyle}> 
                

                <div style={{ marginBottom: '15px' }}>
                    <Link href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                        ← VOLTAR PARA O SITE
                    </Link>
                </div>

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <h1 style={{ color: "#A60C14", textAlign: 'center', marginTop: 0 }}>LOGIN ADM</h1>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <button type="submit" disabled={loading} style={buttonStyle}>
                        {loading ? "Entrando..." : "ENTRAR"}
                    </button>
                </form>
            </div>
        </div>
    );
}

const containerStyle: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f4f4" };
const formStyle: React.CSSProperties = { backgroundColor: "white", padding: "40px", borderRadius: "20px", width: "100%", maxWidth: "400px", boxShadow: '0 4px 10px rgba(0,0,0,0.1)' };
const inputStyle: React.CSSProperties = { padding: "12px", borderRadius: "8px", border: "1px solid #ddd", width: "100%" };
const buttonStyle: React.CSSProperties = { backgroundColor: "#A60C14", color: "white", padding: "12px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };