"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { registerUser, getLoggedUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: ""
  });

  useEffect(() => {
    const logged = getLoggedUser();
    if (logged) router.push("/todo");
  }, [router]);

  function validate() {
    const newErrors: any = { name: "", email: "", password: "", confirmPassword: "", general: "" };
    
    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    if (!email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email inválido";

    if (!password) newErrors.password = "Senha é obrigatória";
    else if (password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres";

    if (!confirmPassword) newErrors.confirmPassword = "Confirme sua senha";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Senhas não conferem";

    setErrors(newErrors);

    return Object.values(newErrors).every(err => !err);
  }

  function handleRegister() {
    if (!validate()) return;

    try {
      registerUser(name, email, password);
      alert("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (err: any) {
      setErrors(prev => ({ ...prev, general: err.message }));
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f3f5" }}>
      <div style={{ backgroundColor: "#fff", padding: "50px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#2c3e50", marginBottom: "20px", textAlign: "center" }}>Criar Conta</h1>
        {errors.general && <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>{errors.general}</p>}
        
        <Input label="Nome" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" error={errors.name} />
        <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seuemail@email.com" error={errors.email} />
        <Input label="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="******" error={errors.password} />
        <Input label="Confirmar Senha" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="******" error={errors.confirmPassword} />

        <Button onClick={handleRegister} style={{ width: "100%", marginTop: "10px" }}>Cadastrar</Button>

        <p style={{ marginTop: "20px", textAlign: "center", color: "#7f8c8d" }}>
          Já tem conta? <a href="/login" style={{ color: "#3498db", fontWeight: "700" }}>Entrar</a>
        </p>
      </div>
    </div>
  );
}
