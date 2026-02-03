import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#CC272F",
      contrastText: "#F7F7F7",
    },

    secondary: {
      main: "#AAAEB5",
      contrastText: "#080808",
    },

    background: {
      default: "#080808",
      paper: "#121212", // cards
    },

    text: {
      primary: "#C9CDD4",
      secondary: "#8C9096",
    },

    divider: "#212121",
  },

  typography: {
    fontFamily: "var(--font-inter), Arial, sans-serif",
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
          color: "#C9CDD4",
          borderRadius: 12,
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0A0A0A",
          color: "#C9CDD4",
        },
      },
    },
  },
});
