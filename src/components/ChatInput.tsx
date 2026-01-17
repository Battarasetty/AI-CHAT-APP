"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";

type ChatInputProps = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="border-t p-4 flex gap-2">
      <Textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={1}
        className="resize-none"
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
}
