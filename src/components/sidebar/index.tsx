"use client";
import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Button,
  Chip,
  Stack,
} from "@mui/material";

// Ícones
import FitnessCenterIcon from "@mui/icons-material/FitnessCenterOutlined";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DRAWER_WIDTH = 256;

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Painel", href: "/", icon: DashboardIcon },
    { name: "Alunos", href: "/students", icon: PersonIcon },
    { name: "Pagamentos", href: "/payments", icon: CreditCardIcon },
    { name: "Horários", href: "/schedules", icon: CalendarMonthIcon },
  ];

  const handleLogout = () => {
    console.log("Saindo...");
    // Adicione aqui sua lógica de limpeza de token
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header: Logo e Título */}
      <Box
        sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, height: 64 }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FitnessCenterIcon sx={{ color: "primary.contrastText" }} />
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            Toca do Samurai
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Sistema de Gestão
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Navegação Principal */}
      <List sx={{ flexGrow: 1, px: 1, py: 2 }}>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": { bgcolor: "primary.dark" },
                    "& .MuiListItemIcon-root": { color: "inherit" },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? "inherit" : "text.secondary",
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Footer: Modalidades e Logout */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ bgcolor: "action.hover", p: 1.5, borderRadius: 2, mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: "text.secondary",
              mb: 1,
              display: "block",
            }}
          >
            MODALIDADES:
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {["Jiu-Jitsu", "Muay Thai", "Taekwondo"].map((mod) => (
              <Chip
                key={mod}
                label={mod}
                size="small"
                color="primary"
                variant="outlined"
                sx={{
                  height: 20,
                  fontSize: "0.625rem",
                  bgcolor: "primary.light",
                  color: "primary.dark",
                  border: "none",
                }}
              />
            ))}
          </Stack>
        </Box>

        <Button
          fullWidth
          variant="text"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ justifyContent: "flex-start", px: 1.5, py: 1 }}
        >
          Sair da Conta
        </Button>
      </Box>
    </Drawer>
  );
}
