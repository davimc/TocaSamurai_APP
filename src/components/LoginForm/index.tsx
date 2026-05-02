"use client";
import { Button, TextField, Typography } from "@mui/material";

interface LoginFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
}

export default function LoginForm({
  handleSubmit,
  setUsername,
  setPassword,
}: LoginFormProps) {
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
      <Typography variant="h4" mb={4}>
        Login
      </Typography>

      <TextField
        fullWidth
        label="Username"
        margin="normal"
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        sx={{ mt: 3 }}
      >
        Entrar
      </Button>
    </form>
  );
}
