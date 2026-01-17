import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { clientPromise } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

import { getWeather } from "@/lib/tools/weather";
import { getStockPrice } from "@/lib/tools/stocks";
import { getF1LastRaceWinner } from "@/lib/tools/f1";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { chatId, message } = await req.json();
    if (!chatId || !message) return NextResponse.json({ error: "Bad Request" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db();

    const chat = await db.collection("chats").findOne({ _id: new ObjectId(chatId), userId: session.user.id });
    if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });

    const userMsg = { role: "user", content: message, type: "text", createdAt: new Date() };
    await db.collection("chats").updateOne(
        { _id: new ObjectId(chatId) },
        { $push: { messages: userMsg }, $set: { updatedAt: new Date() } }
    );

    // AI response
    let aiMsg: any = { role: "ai", type: "text", content: "" };
    const lower = message.toLowerCase();
    if (lower.includes("weather")) {
        aiMsg = { role: "ai", type: "weather", data: await getWeather("Bangalore") };
    } else if (lower.includes("stock")) {
        aiMsg = { role: "ai", type: "stock", data: await getStockPrice("AAPL") };
    } else if (lower.includes("f1")) {
        aiMsg = { role: "ai", type: "f1", data: await getF1LastRaceWinner() };
    } else {
        aiMsg.content = "I can help with weather, stocks, or F1 data.";
    }

    await db.collection("chats").updateOne(
        { _id: new ObjectId(chatId) },
        { $push: { messages: aiMsg }, $set: { updatedAt: new Date() } }
    );

    return NextResponse.json({ data: aiMsg });
}
