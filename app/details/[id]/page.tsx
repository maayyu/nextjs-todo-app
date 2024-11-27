/*TODO詳細ページ*/
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTodoById } from "../../../lib/supabaseClient";

export default function Details({ params }: { params: { id: string } }) {
  const { id } = params;
  const [todo, setTodo] = useState<any | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      const data = await getTodoById(id);
      setTodo(data);
    };
    fetchTodo();
  }, [id]);

  if (!todo) return <div>Loading...</div>;

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <p>作成日時: {todo.created_at}</p>
      {/* 編集・削除機能をここに追加 */}
    </div>
  );
}
