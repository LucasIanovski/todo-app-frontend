"use client";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function LoginPage() {
  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h1>Testando Componentes</h1>

      <Input label="Email" />
      <Input label="Senha" type="password" />

      <Button>Entrar</Button>
    </div>
  );
}
