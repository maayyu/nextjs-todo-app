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
import supabase, { updateTodo } from "../lib/supabaseClient";

interface Todo {
  id: number;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("todos").select("*");
      if (error) {
        console.error("Todoの取得エラー:", error);
      } else {
        console.log("取得したデータ:", data);
        setTodos(data || []);
      }
    };
    fetchTodos();
  }, []);

  // チェックボックスの状態を切り替えるための非同期処理（データベースに反映）
  const toggleComplete = async (id: number, currentCompleted: boolean) => {
    try {
      // Supabaseに状態更新
      const updatedTodo = await updateTodo(id.toString(), {
        completed: !currentCompleted,
      });
      console.log(updatedTodo);

      // ローカルの状態を更新
      // if (updatedTodo) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !currentCompleted } : todo
          )
        );
        console.log(updatedTodo);
      // }
    } catch (error) {
      console.error("Error toggling complete status:", error);
    }
  };

  //削除ボタンの処理
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        すべてのTODO
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
            {/* 左端に配置するチェックボックス */}
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id, todo.completed)}
              color="primary"
              style={{ marginRight: "1rem" }}
            />

            {/* タイトルと詳細 */}
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
                期限: {todo.due_date}
              </Typography>
            </div>

            {/* ボタン類 */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
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
