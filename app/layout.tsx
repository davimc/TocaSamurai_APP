import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MuiProvider from "@/providers/MuiProvider";
import "./globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Box } from "@mui/material";
import Sidebar from "@/components/sidebar";
import AppShell from "@/components/AppShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toca do Samurai",
  description: "Sistema de gestão da Toca do Samurai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <AuthProvider>
          <MuiProvider>
            <AppShell>{children}</AppShell>
          </MuiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
