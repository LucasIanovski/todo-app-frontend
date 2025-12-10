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
  const [error, setError] = useState("");

  useEffect(() => {
    const logged = getLoggedUser();
    if (logged) router.push("/todo");
  }, [router]);

  function handleLogin() {
    try {
      loginUser(email, password);
      router.push("/todo");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#0079BF" }}>
      <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
        <h1 style={{ color: "#172B4D", marginBottom: "20px", textAlign: "center" }}>Login</h1>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seuemail@email.com"/>
        <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="******"/>
        <Button onClick={handleLogin} style={{ width: "100%", marginTop: "10px" }}>Entrar</Button>
        <p style={{ marginTop: "20px", textAlign: "center", color: "#172B4D" }}>
          Não tem conta? <a href="/register" style={{ color: "#026AA7", fontWeight: "bold" }}>Criar conta</a>
        </p>
      </div>
    </div>
  );
}
