import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { clientPromise } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json([], { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const chats = await db
        .collection("chats")
        .find({ userId: session.user.id })
        .sort({ updatedAt: -1 })
        .project({ title: 1 })
        .toArray();

    return NextResponse.json(
        chats.map(chat => ({
            _id: chat._id.toString(),
            title: chat.title,
        }))
    );
}
