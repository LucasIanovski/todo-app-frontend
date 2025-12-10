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
    <div style={{ minHeight: "100vh", backgroundColor: "#E2E4E6", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#172B4D" }}>Kanban de {user.name}</h1>
        <Button onClick={handleLogout} style={{ backgroundColor: "#EB5A46" }}>Logout</Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Nova tarefa"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "300px", marginRight: "10px" }}
        />
        <Button onClick={addTodo} style={{ backgroundColor: "#5AAC44" }}>Adicionar</Button>
      </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        {["To Do", "Doing", "Done"].map((col) => (
          <div key={col} style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "8px", flex: 1, boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <h3 style={{ textAlign: "center" }}>{col}</h3>
            {col === "To Do" && todos.map(todo => (
              <div key={todo.id} style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "6px", margin: "8px 0", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {todo.text}
                <button onClick={() => removeTodo(todo.id)} style={{ background: "none", border: "none", color: "red", cursor: "pointer" }}>✕</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
