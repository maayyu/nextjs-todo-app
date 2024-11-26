/*TODO一覧ページ*/
"use client";

import {
  Button,
  Checkbox,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default function HomePage() {
  // サンプルTodoリスト
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { date, error } = await supabase.from("todos").select("*");
      if (error) {
        console.error("Todoの取得エラー:", error);
      } else {
        setTodos(date || []);
      }
    };
    fetchTodos();
  }, []);

  //完了ステータスの切り替え
  const toggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  //削除ボタンの処理
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        TODO一覧
      </Typography>
      <Link href="/create" passHref>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "1rem" }}
        >
          新しいTODOを作成
        </Button>
      </Link>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              backgroundColor: todo.completed ? "#e8f5e9" : "#ffffff",
            }}
          >
            <div style={{ flex: 1 }}>
              <Typography
                variant="h6"
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {todo.description}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                期限: {todo.dueDate}
              </Typography>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                color="primary"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteTodo(todo.id)}
              >
                削除
              </Button>
              <Link href={`/detail/${todo.id}`} passHref>
                <Button variant="outlined" color="primary">
                  詳細
                </Button>
              </Link>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
