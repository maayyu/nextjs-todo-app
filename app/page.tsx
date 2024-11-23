/*TODO一覧ページ*/
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTodos } from "../lib/supabaseClient";

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>TODO一覧</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - <Link href={`/details/${todo.id}`}>詳細を見る</Link>
          </li>
        ))}
      </ul>
      <Link href="/create">新しいTODOを作成</Link>
    </div>
  );
}
