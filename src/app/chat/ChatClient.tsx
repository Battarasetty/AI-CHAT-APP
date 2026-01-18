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
  chatId,
}: {
  messages: Message[];
  chatId: string;
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);


  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    if (isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, message: text }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const aiMessage = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: aiMessage.content ?? "",
          type: aiMessage.type ?? "text",
          data: aiMessage.data,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Something went wrong. Please try again.",
          type: "text",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <TopBar />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isLoading && (
          <p className="mt-10 text-center text-gray-400">
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

        {isLoading && (
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500">
            <span className="animate-pulse">AI is typing</span>
            <span className="animate-bounce">…</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
