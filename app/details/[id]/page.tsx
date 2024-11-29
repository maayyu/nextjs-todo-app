/*TODO詳細ページ*/
"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import supabase from "../../../lib/supabaseClient";

interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default function TodoDetail() {
  const router = useRouter();
  const { id } = router.query; // URLの動的パラメータからidを取得
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // idが取得できるまで待つ
  useEffect(() => {
    if (id) {
      fetchTodoDetails(id as string); // idが取得できたら詳細を取得
    }
  }, [id]); // idが変更されるたびにデータを取得

  // TODO詳細を取得する関数
  const fetchTodoDetails = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("id", id)
        .single(); // 単一のTODOを取得
      if (error) throw error;
      setTodo(data);
    } catch (error) {
      console.error("Error fetching todo details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!todo) {
    return <p>Todoが見つかりません</p>;
  }

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", todo.id);
      if (error) throw error;
      router.push("/"); // 削除後にTODO一覧ページに遷移
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = () => {
    router.push(`/edit/${todo.id}`); // 編集ページへ遷移
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        TODO詳細
      </Typography>
      <Box>
        <Typography variant="h6" gutterBottom>
          タイトル: {todo.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          説明: {todo.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          期限: {todo.dueDate}
        </Typography>
        <Typography
          variant="body2"
          color={todo.completed ? "primary" : "secondary"}
        >
          ステータス: {todo.completed ? "完了" : "未完了"}
        </Typography>
      </Box>

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          編集
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          style={{ marginLeft: "1rem" }}
        >
          削除
        </Button>
      </Box>
    </Container>
  );
}
