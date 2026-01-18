"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean; 
};

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || disabled) return; 
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
        disabled={disabled} 
      />
      <Button 
        onClick={handleSend} 
        disabled={disabled} 
        className={disabled ? "opacity-50 cursor-not-allowed" : ""}
      >
        Send
      </Button>
    </div>
  );
}
