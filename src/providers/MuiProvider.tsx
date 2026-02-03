"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { muiTheme } from "@/theme/mui-theme";

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
