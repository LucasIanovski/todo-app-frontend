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

  // Protege a página se o usuário já estiver logado
  useEffect(() => {
    const logged = getLoggedUser();
    if (logged) {
      router.push("/todo");
    }
  }, [router]);

  function handleLogin() {
    try {
      loginUser(email, password); // Tenta logar
      router.push("/todo");       // Redireciona para a página de todo
    } catch (err: any) {
      setError(err.message);      // Mostra erro se falhar
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

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

      <Button onClick={handleLogin}>Entrar</Button>

      <p style={{ marginTop: "20px" }}>
        Não tem conta? <a href="/register">Criar conta</a>
      </p>
    </div>
  );
}
