"use client";

import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/sidebar";
import { Box, CircularProgress } from "@mui/material";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  // 1. Enquanto verifica o cookie, mostra um loading centralizado
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* 2. Se logado, renderiza a Sidebar. Se não (tela de login), ela some! */}
      {isAuthenticated && <Sidebar />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // Ajusta a margem esquerda apenas se a sidebar estiver visível
          ml: isAuthenticated ? "256px" : 0,
          p: isAuthenticated ? 3 : 0,
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
