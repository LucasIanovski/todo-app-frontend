export function registerUser(name: string, email: string, password: string) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Verifica se o email já existe
  if (users.find((u: any) => u.email === email)) {
    throw new Error("Email já cadastrado");
  }

  users.push({ name, email, password });

  localStorage.setItem("users", JSON.stringify(users));
}

export function loginUser(email: string, password: string) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) throw new Error("Credenciais inválidas");

  localStorage.setItem("loggedUser", JSON.stringify(user));
}

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser") || "null");
}

export function logoutUser() {
  localStorage.removeItem("loggedUser");
}
