import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { clientPromise } from "@/lib/mongodb";

export default async function Sidebar() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const client = await clientPromise;
  const db = client.db();

  const chats = await db
    .collection("chats")
    .find({ userId: session.user.id })
    .sort({ updatedAt: -1 })
    .toArray();

  return (
    <aside className="w-64 border-r bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">Chats</h2>

      {chats.length === 0 ? (
        <p className="text-sm text-gray-500">No chats yet</p>
      ) : (
        <ul className="space-y-2">
          {chats.map(chat => (
            <li key={chat._id.toString()}>
              <Link
                href={`/chat/${chat._id.toString()}`}
                className="flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-gray-100"
              >
                <span>🗨️</span>
                <span className="truncate">{chat.title || "New Chat"}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link href="/chat" className="mt-4 inline-block text-sm text-blue-600">
        + New Chat
      </Link>
    </aside>
  );
}
