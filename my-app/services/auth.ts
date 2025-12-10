interface User {
  name: string;
  email: string;
  password: string;
}

export function registerUser(name: string, email: string, password: string) {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  if (!name || !email || !password) {
    throw new Error("Todos os campos são obrigatórios");
  }

  if (users.find(u => u.email === email)) {
    throw new Error("Email já cadastrado");
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
}

export function loginUser(email: string, password: string) {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) throw new Error("Credenciais inválidas");
  localStorage.setItem("loggedUser", JSON.stringify(user));
}

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser") || "null");
}

export function logoutUser() {
  localStorage.removeItem("loggedUser");
}
