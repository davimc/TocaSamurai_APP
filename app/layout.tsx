import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MuiProvider from "@/providers/MuiProvider";
import Sidebar from "@/components/sidebar";
import "./globals.css";

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
    // TODO: Mobile design
    <html lang="pt-BR">
      <body className={inter.variable}>
        <MuiProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
        </MuiProvider>
      </body>
    </html>
  );
}
