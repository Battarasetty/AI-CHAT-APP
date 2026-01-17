import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { clientPromise } from "@/lib/mongodb"; // MongoClient
import { ObjectId } from "mongodb";

import { getWeather } from "@/lib/tools/weather";
import { getStockPrice } from "@/lib/tools/stocks";
import { getF1LastRaceWinner } from "@/lib/tools/f1";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const { chatId, message } = await req.json(); // receive chatId + user message
    if (!chatId || !message) return new NextResponse("Bad Request", { status: 400 });

    try {
        const client = await clientPromise;
        const db = client.db();

        // 1️⃣ Verify chat belongs to user
        const chat = await db.collection("chats").findOne({ _id: new ObjectId(chatId), userId: session.user.id });
        if (!chat) return new NextResponse("Chat not found", { status: 404 });

        // 2️⃣ Append USER message
        const userMsg = {
            role: "user",
            content: message,
            type: "text",
            createdAt: new Date(),
        };

        await db.collection("chats").updateOne(
            { _id: new ObjectId(chatId) },
            { $push: { messages: userMsg }, $set: { updatedAt: new Date() } }
        );

        // 3️⃣ Determine AI response
        let aiMsg: any = { role: "ai", type: "text", content: "" };

        const lower = message.toLowerCase();
        if (lower.includes("weather")) {
            const data = await getWeather("Bangalore");
            aiMsg = { role: "ai", type: "weather", data };
        } else if (lower.includes("stock")) {
            const data = await getStockPrice("AAPL");
            aiMsg = { role: "ai", type: "stock", data };
        } else if (lower.includes("f1")) {
            const data = await getF1LastRaceWinner();
            aiMsg = { role: "ai", type: "f1", data };
        } else {
            aiMsg.content = "I can help with weather, stocks, or F1 data.";
        }

        // 4️⃣ Append AI message
        await db.collection("chats").updateOne(
            { _id: new ObjectId(chatId) },
            { $push: { messages: aiMsg }, $set: { updatedAt: new Date() } }
        );

        return NextResponse.json({ data: aiMsg });
    } catch (err) {
        console.error("Error sending message:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
