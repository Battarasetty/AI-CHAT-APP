"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Chat = {
  _id: string;
  title?: string;
};

export default function Sidebar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const pathname = usePathname();

  async function loadChats() {
    const res = await fetch("/api/chats");
    if (res.ok) {
      const data = await res.json();
      setChats(data);
    }
  }

  useEffect(() => {
    loadChats();
  }, [pathname]);

  useEffect(() => {
    const refresh = () => loadChats();
    window.addEventListener("chat-updated", refresh);

    return () => {
      window.removeEventListener("chat-updated", refresh);
    };
  }, []);

  return (
    <aside className="w-64 border-r bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">Chats</h2>

      {chats.length === 0 ? (
        <p className="text-sm text-gray-500">No chats yet</p>
      ) : (
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li key={chat._id}>
              <Link
                href={`/chat/${chat._id}`}
                className="flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-gray-100"
              >
                <span>🗨️</span>
                <span className="truncate">{chat.title || "New Chat"}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
