import { apiFetch } from "@/lib/api";

export function getAuthHeader() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}
export function clearAuthToken() {
  localStorage.removeItem("token");
}

export async function loginRequest(username: string, password: string) {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Credenciais inválidas");
  }

  const data = await response.json();
  return data.token; // Retorna apenas o que interessa
}
