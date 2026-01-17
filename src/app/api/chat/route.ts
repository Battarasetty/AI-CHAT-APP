import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/Message";

import { getWeather } from "@/lib/tools/weather";
import { getStockPrice } from "@/lib/tools/stocks";
import { getF1LastRaceWinner } from "@/lib/tools/f1";

export async function POST(req: Request) {
    /* ---------------------------
       1️⃣ Auth Check
    ---------------------------- */
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.email;

    /* ---------------------------
       2️⃣ Parse Request
    ---------------------------- */
    const { messages } = await req.json();
    const lastMessage = messages?.[messages.length - 1]?.content;

    if (!lastMessage || typeof lastMessage !== "string") {
        return NextResponse.json({
            type: "text",
            data: { content: "Invalid message." },
        });
    }

    /* ---------------------------
       3️⃣ DB Connect + Save USER message
    ---------------------------- */
    await connectDB();

    await Message.create({
        userId,
        role: "user",
        type: "text",
        content: lastMessage,
    });

    const lowerMessage = lastMessage.toLowerCase();

    /* ---------------------------
       4️⃣ Intent Detection + Tool Calls
    ---------------------------- */

    // 🌤 Weather
    if (lowerMessage.includes("weather")) {
        const data = await getWeather("Bangalore");

        await Message.create({
            userId,
            role: "ai",
            type: "weather",
            data,
        });

        return NextResponse.json({
            type: "weather",
            data,
        });
    }

    // 📈 Stock
    if (lowerMessage.includes("stock")) {
        const data = await getStockPrice("AAPL");

        await Message.create({
            userId,
            role: "ai",
            type: "stock",
            data,
        });

        return NextResponse.json({
            type: "stock",
            data,
        });
    }

    // 🏎 F1
    if (lowerMessage.includes("f1")) {
        const data = await getF1LastRaceWinner();

        await Message.create({
            userId,
            role: "ai",
            type: "f1",
            data,
        });

        return NextResponse.json({
            type: "f1",
            data,
        });
    }

    /* ---------------------------
       5️⃣ Fallback Text Response
    ---------------------------- */
    const fallbackText = "I can help with weather, stocks, or F1 data.";

    await Message.create({
        userId,
        role: "ai",
        type: "text",
        content: fallbackText,
    });

    return NextResponse.json({
        type: "text",
        data: { content: fallbackText },
    });
}
