"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import LoginForm from "../LoginForm";
import { loginRequest } from "@/lib/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login: authLogin } = useAuth(); // Pega a função de login do seu Contexto

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const token = await loginRequest(username, password);

      // 1. Salva o cookie
      Cookies.set("token", token, { expires: 1 });

      authLogin(token);

      // 3. Redireciona
      router.push("/");
    } catch (error) {
      alert("Erro ao logar!");
    }
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Lado do Banner */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          bgcolor: "grey.100",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2">Toca Samurai</Typography>
      </Box>

      {/* Lado do Formulário - Passando a lógica via props */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoginForm
          handleSubmit={handleSubmit}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </Box>
    </Box>
  );
}
