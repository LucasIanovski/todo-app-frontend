"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { loginUser, getLoggedUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });

  useEffect(() => {
    const logged = getLoggedUser();
    if (logged) router.push("/todo");
  }, [router]);

  function validate() {
    const newErrors = { email: "", password: "", general: "" };
    if (!email.trim()) newErrors.email = "Email é obrigatório";
    if (!password) newErrors.password = "Senha é obrigatória";
    setErrors(newErrors);
    return Object.values(newErrors).every(err => !err);
  }

  function handleLogin() {
    if (!validate()) return;

    try {
      loginUser(email, password);
      router.push("/todo");
    } catch (err: any) {
      setErrors(prev => ({ ...prev, general: err.message }));
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f3f5" }}>
      <div style={{ backgroundColor: "#fff", padding: "50px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#2c3e50", marginBottom: "20px", textAlign: "center" }}>Login</h1>
        {errors.general && <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>{errors.general}</p>}

        <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seuemail@email.com" error={errors.email} />
        <Input label="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="******" error={errors.password} />

        <Button onClick={handleLogin} style={{ width: "100%", marginTop: "10px" }}>Entrar</Button>

        <p style={{ marginTop: "20px", textAlign: "center", color: "#7f8c8d" }}>
          Não tem conta? <a href="/register" style={{ color: "#3498db", fontWeight: "700" }}>Criar conta</a>
        </p>
      </div>
    </div>
  );
}
