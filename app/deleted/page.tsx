"use client";

import { Container, List, ListItem, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getDeletedTodos,
  restoreTodo,
  deleteTodo,
} from "../../lib/supabaseClient";

interface Todo {
  id: number;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  deleted: boolean;
}

export default function DeletedTodosPage() {
  const [deletedTodos, setDeletedTodos] = useState<Todo[]>([]);

  // 削除済みのTodoを取得
  useEffect(() => {
    const fetchDeletedTodos = async () => {
      const todos = await getDeletedTodos();
      setDeletedTodos(todos);
    };
    fetchDeletedTodos();
  }, []);

  // 復元する処理
  const restoreTodoHandler = async (id: number) => {
    try {
      await restoreTodo(id.toString());
      setDeletedTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      console.error("Error restoring todo:", error);
    }
  };

  //削除ボタンの処理
  const deletedTodoHandler = async (id: number) => {
    try {
      // Supabaseに状態更新
      await deleteTodo(id.toString());
      console.log(deletedTodoHandler);
      setDeletedTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      console.error("Error toggling delete status:", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        削除済みのTODO
      </Typography>
      <List>
        {deletedTodos.map((todo) => (
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
              backgroundColor: "#f8f8f8",
            }}
          >
            <div style={{ flex: 1 }}>
              <Typography variant="h6">{todo.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {todo.description}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                期限: {todo.due_date}
              </Typography>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => restoreTodoHandler(todo.id)}
              >
                復元
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deletedTodoHandler(todo.id)}
              >
                完全に削除
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
      <Link href="/" passHref>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "1rem" }}
        >
          戻る
        </Button>
      </Link>
    </Container>
  );
}
