// src/app/chat/[chatId]/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { clientPromise } from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // ✅ Import ObjectId
import ChatClient from "../ChatClient";

type PageProps = {
  params: Promise<{ chatId: string }>; // ✅ params can be Promise
};

export default async function ChatPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const { chatId } = await params; // ✅ await params

  const client = await clientPromise;
  const db = client.db();

  let chat = await db.collection("chats").findOne({
    _id: new ObjectId(chatId),
    userId: session.user.id,
  });

  if (!chat) {
    const newChat = await db.collection("chats").insertOne({
      userId: session.user.id,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return redirect(`/chat/${newChat.insertedId.toString()}`);
  }

  const messages = chat.messages || [];

  return <ChatClient messages={messages} chatId={chatId} />;
}
