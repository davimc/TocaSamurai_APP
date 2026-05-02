// src/services/login.ts
// Não tem "use client", não tem hooks, não tem router, não tem cookies.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function loginService(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Credenciais inválidas");
  }

  const data = await response.json();

  // Supondo que o Java retorne algo como: { token: "eyJh..." }
  // Retornamos apenas o token para quem chamou a função
  return data.token;
}
