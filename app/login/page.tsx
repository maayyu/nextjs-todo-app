//ログイン

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient"; // Supabaseクライアントのインポート
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Supabaseでログイン
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Failed to log in. Please check your email and password.");
    } else {
      // ログイン成功時はTODO一覧ページにリダイレクト
      router.push("/");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          marginTop: 5,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              sx={{ padding: "10px", marginTop: 2 }}
            >
              Log In
            </Button>
          </Box>
        </form>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <a href="/signup" style={{ textDecoration: "none" }}>
              Sign Up
            </a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
