// app/chat/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/Message";

import ChatClient from "./ChatClient";

export default async function ChatPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  await connectDB();

  const messages = await Message.find({ userId: session.user.email })
    .sort({ createdAt: 1 })
    .lean(); // ✅ converts to plain JS objects

  // Convert _id and Date to strings to avoid Server → Client errors
  const safeMessages = messages.map((msg) => ({
    ...msg,
    _id: msg._id.toString(),
    createdAt: msg.createdAt.toISOString(),
    updatedAt: msg.updatedAt.toISOString(),
  }));

  return <ChatClient messages={safeMessages} />;
}
