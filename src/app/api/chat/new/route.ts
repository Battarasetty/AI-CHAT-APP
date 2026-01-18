import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { clientPromise } from "@/lib/mongodb"; 

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("chats").insertOne({
      userId: session.user.id,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ chatId: result.insertedId.toString() });
  } catch (err) {
    console.error("Error creating new chat:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
