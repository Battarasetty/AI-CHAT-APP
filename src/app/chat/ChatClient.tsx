"use client";

import { useEffect, useRef, useState } from "react";

import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TopBar from "@/components/Topbar";

import WeatherCard from "@/components/cards/WeatherCard";
import StockCard from "@/components/cards/StockCard";
import F1Card from "@/components/cards/F1Card";

type Message = {
  _id?: string;
  role: "user" | "ai";
  content?: string;
  type?: "weather" | "stock" | "f1" | "text";
  data?: any;
};

export default function ChatClient({
  messages: initialMessages,
}: {
  messages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /* ---------------------------
     Auto scroll
  ---------------------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ---------------------------
     Send message
  ---------------------------- */
  const handleSendMessage = async (text: string) => {
    const updated = [
      ...messages,
      { role: "user", content: text, type: "text" },
    ];
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
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            👋 Ask me about weather, stocks, or F1.
          </p>
        )}

        {messages.map((msg, index) => (
          <ChatMessage
            key={msg._id?.toString() || index}
            role={msg.role}
            content={msg.content}
          >
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
