"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  const router = useRouter();

  async function handleNewChat() {
    try {
      const res = await fetch("/api/chat/new", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to create new chat");
      }

      const { chatId } = await res.json();

      // ✅ IMPORTANT: navigate to the new chat
      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create new chat");
    }
  }

  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-3">
      <h1 className="text-lg font-semibold">AI Assistant</h1>

      <button
        onClick={handleNewChat}
        className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
      >
        + New Chat
      </button>

      <Button
        variant="destructive"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Logout
      </Button>
    </div>
  );
}
