"use client";

import { useState, useEffect } from "react";
import { getLoggedUser, logoutUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

type TodoItem = { id: number; text: string };

export default function TodoPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    const logged = getLoggedUser();
    if (!logged) router.push("/login");
    else {
      setUser(logged);
      const savedTodos = JSON.parse(localStorage.getItem(`${logged.email}_todos`) || "[]");
      setTodos(savedTodos);
    }
  }, [router]);

  function addTodo() {
    if (!task) return;
    const newTodos = [...todos, { id: Date.now(), text: task }];
    setTodos(newTodos);
    localStorage.setItem(`${user.email}_todos`, JSON.stringify(newTodos));
    setTask("");
  }

  function removeTodo(id: number) {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
    localStorage.setItem(`${user.email}_todos`, JSON.stringify(newTodos));
  }

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ecf0f1", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#2c3e50" }}>Kanban de {user.name}</h1>
        <Button onClick={handleLogout} style={{ backgroundColor: "#e74c3c" }}>Logout</Button>
      </div>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Nova tarefa"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            flex: 1,
            fontSize: "14px",
            color: "#2c3e50",
            backgroundColor: "#fff",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)"
          }}
        />
        <Button onClick={addTodo} style={{ backgroundColor: "#27ae60" }}>Adicionar</Button>
      </div>

      <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
        {["To Do", "In Progress", "Done"].map(col => (
          <div key={col} style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "15px", minWidth: "250px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontWeight: 600, marginBottom: "10px", color: "#34495e" }}>{col}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {col === "To Do" && todos.map(todo => (
                <div key={todo.id} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "#ecf0f1", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", color: "#2c3e50" }}>
                  {todo.text}
                  <button onClick={() => removeTodo(todo.id)} style={{ background: "none", border: "none", color: "#e74c3c", cursor: "pointer", fontWeight: 700 }}>✕</button>
                </div>
              ))}
              {col !== "To Do" && <p style={{ color: "#7f8c8d", fontSize: "14px" }}>Nenhuma tarefa</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
