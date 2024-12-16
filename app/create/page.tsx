/*TODO作成ページ*/
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, TextField, Typography } from "@mui/material";
import { addTodo } from "../../lib/supabaseClient";

export default function CreatePage() {
  const router = useRouter();

  //フォームの状態管理
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });

  //入力された内容の変更処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  //フォームの送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //タイトルは必須
    if (!form.title) {
      alert("タイトルは必須です。");
      return;
    }

    //データの保存
    try {
      await addTodo(form);
      router.push("/");
    } catch (error) {
      console.error("Todo作成エラー:", error);
      alert("Todoの作成に失敗しました。");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        新しいTodoを作成
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="タイトル"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="説明"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="期限"
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          作成
        </Button>
      </form>
    </Container>
  );
}
