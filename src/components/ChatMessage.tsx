import React from "react";

export default function ChatMessage({
  role,
  content,
  children,
}: {
  role: "user" | "ai";
  content?: string;
  children?: React.ReactNode;
}) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {content && <p className="">{content}</p>}
        {children}
      </div>
    </div>
  );
}
