// src/lib/api.ts
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  tokenOverride?: string, // Adicionamos este parâmetro opcional
): Promise<T> {
  // Se não passarmos um token manual, tentamos pegar do cookie (lado do cliente)
  const token = tokenOverride || Cookies.get("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.status}`);
  }

  return response.json();
}
