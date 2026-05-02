"use client";

import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/sidebar";
import { Box, CircularProgress } from "@mui/material";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

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
      {isAuthenticated && <Sidebar />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
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
