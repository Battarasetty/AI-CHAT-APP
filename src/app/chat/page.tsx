import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { clientPromise } from "@/lib/mongodb";
import ChatClient from "./ChatClient";

export default async function ChatPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) redirect("/login");

  const client = await clientPromise;
  const db = client.db();

  let chat = await db
    .collection("chats")
    .findOne({ userId: session.user.id }, { sort: { updatedAt: -1 } });

  if (!chat) {
    const newChat = await db.collection("chats").insertOne({
      userId: session.user.id,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    chat = await db.collection("chats").findOne({ _id: newChat.insertedId });
  }

  const messages = chat.messages || [];
  const chatId = chat._id.toString();

  return <ChatClient messages={messages} chatId={chatId} />;
}
