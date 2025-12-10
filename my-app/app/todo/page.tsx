"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { getLoggedUser, logoutUser } from "@/services/auth";
import { useRouter } from "next/navigation";

type TodoItem = {
  id: number;
  text: string;
};

export default function TodoPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // Proteção da página: só acessível se usuário estiver logado
  useEffect(() => {
    const logged = getLoggedUser();
    if (!logged) {
      router.push("/login"); // Redireciona para login se não estiver logado
    } else {
      setUser(logged);
      const savedTodos = JSON.parse(localStorage.getItem(`${logged.email}_todos`) || "[]");
      setTodos(savedTodos);
    }
  }, [router]);

  // Adicionar nova tarefa
  function addTodo() {
    if (!task) return;

    const newTodos = [...todos, { id: Date.now(), text: task }];
    setTodos(newTodos);
    localStorage.setItem(`${user.email}_todos`, JSON.stringify(newTodos));
    setTask("");
  }

  // Remover tarefa
  function removeTodo(id: number) {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
    localStorage.setItem(`${user.email}_todos`, JSON.stringify(newTodos));
  }

  // Logout
  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  if (!user) return null; // Evita renderizar antes da verificação do login

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h1>Todo List de {user.name}</h1>

      <Button
        onClick={handleLogout}
        style={{ backgroundColor: "red", marginBottom: "20px" }}
      >
        Logout
      </Button>

      <Input
        label="Nova tarefa"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button onClick={addTodo}>Adicionar</Button>

      <ul style={{ marginTop: "20px", paddingLeft: "20px" }}>
        {todos.map((t) => (
          <li key={t.id} style={{ marginBottom: "10px" }}>
            {t.text}{" "}
            <button
              onClick={() => removeTodo(t.id)}
              style={{
                color: "red",
                marginLeft: "10px",
                cursor: "pointer",
                border: "none",
                background: "none",
              }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
