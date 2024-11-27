//サインアップ

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient"; // Supabaseクライアントのインポート
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Supabaseのサインアップ機能を使用
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message); // エラーメッセージを表示
    } else {
      // サインアップが成功した場合、ログインページにリダイレクト
      router.push("/login");
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
          Sign Up
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSignup}>
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
              Sign Up
            </Button>
          </Box>
        </form>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <a href="/login" style={{ textDecoration: "none" }}>
              Log In
            </a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
