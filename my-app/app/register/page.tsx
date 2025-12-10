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
  const [error, setError] = useState("");

  // Protege a página se o usuário já estiver logado
  useEffect(() => {
    const logged = getLoggedUser();
    if (logged) {
      router.push("/todo");
    }
  }, [router]);

  function handleRegister() {
    try {
      registerUser(name, email, password); // Tenta registrar
      alert("Cadastro realizado com sucesso!");
      router.push("/login"); // Redireciona para login
    } catch (err: any) {
      setError(err.message); // Mostra erro se falhar
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h1>Criar Conta</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Input
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleRegister}>Cadastrar</Button>

      <p style={{ marginTop: "20px" }}>
        Já tem conta? <a href="/login">Entrar</a>
      </p>
    </div>
  );
}
