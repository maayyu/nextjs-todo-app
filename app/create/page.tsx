/*TODO作成ページ*/
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTodo } from "../../lib/supabaseClient";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = await createTodo(title, description);
    if (newTodo) {
      router.push("/"); // 作成後に一覧ページにリダイレクト
    }
  };

  return (
    <div>
      <h1>新しいTODOを作成</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>詳細:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">作成</button>
      </form>
    </div>
  );
}
