"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TopBar from "@/components/Topbar";

import WeatherCard from "@/components/cards/WeatherCard";
import StockCard from "@/components/cards/StockCard";
import F1Card from "@/components/cards/F1Card";

type Message = {
  role: "user" | "ai";
  content?: string;
  type?: "weather" | "stock" | "f1";
  data?: any;
};

export default function ChatPage() {
  const router = useRouter();
  const { status } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /* ---------------------------
     1️⃣ Protect Route
  ---------------------------- */
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  /* ---------------------------
     2️⃣ Load Messages
  ---------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  /* ---------------------------
     3️⃣ Save Messages
  ---------------------------- */
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  /* ---------------------------
     4️⃣ Auto Scroll
  ---------------------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  /* ---------------------------
     5️⃣ Send Message
  ---------------------------- */
  const handleSendMessage = async (text: string) => {
    const updated = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      const result = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: result?.data?.content,
          type: result?.type,
          data: result?.data,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "❌ Error getting response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------
     UI
  ---------------------------- */
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <TopBar />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content}>
            {msg.type === "weather" && <WeatherCard {...msg.data} />}
            {msg.type === "stock" && <StockCard {...msg.data} />}
            {msg.type === "f1" && <F1Card {...msg.data} />}
          </ChatMessage>
        ))}

        {loading && (
          <div className="text-sm text-gray-500">AI is typing...</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
