import { createClient } from "@supabase/supabase-js";

// 環境変数からSupabaseのURLとAPIキーを取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabaseクライアントの作成
const supabase = createClient(supabaseUrl, supabaseKey);

// 新しいTodoの追加
export const addTodo = async (todo: {
  title: string;
  description: string;
  dueDate: string;
}) => {
  const { data, error } = await supabase.from("todos").insert([
    {
      title: todo.title,
      description: todo.description,
      due_date: todo.dueDate,
      completed: false,
    },
  ]);
  if (error) throw new Error(error.message);
  return data;
};

// 全てのTodoの取得
export const getTodos = async () => {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
  return data;
};

// 入力されたTodo詳細の取得
export const getTodoById = async (id: string) => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching todo by id:", error);
    return null;
  }
  return data;
};

// 入力されたTodo情報の更新
export const updateTodo = async (id: string, updatedFields: Partial<any>) => {
  const { data, error } = await supabase
    .from("todos")
    .update(updatedFields)
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error updating todo:", error);
    return null;
  }
  return data;
};

// 入力されたTodo情報の削除
export const deleteTodo = async (id: string) => {
  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error deleting todo:", error);
    return null;
  }
  return data;
};

export default supabase;
