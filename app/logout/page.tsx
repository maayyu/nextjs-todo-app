//ログアウト

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut(); // ログアウト処理
      router.push("/login"); // ログインページにリダイレクト
    };

    logout();
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>Logging out...</p>
    </div>
  );
};

export default LogoutPage;
