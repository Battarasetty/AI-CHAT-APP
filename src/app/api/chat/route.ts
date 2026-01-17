import { NextResponse } from "next/server";
import { getWeather } from "@/lib/tools/weather";
import { getStockPrice } from "@/lib/tools/stocks";
import { getF1LastRaceWinner } from "@/lib/tools/f1";

export async function POST(req: Request) {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content.toLowerCase()

    // Weather intent
    if (lastMessage.includes("weather")) {
        const data = await getWeather("Bangalore")
        return NextResponse.json({
            type: "weather",
            data
        })
    }

    // Stock intent
    if (lastMessage.includes("stock")) {
        const data = await getStockPrice("AAPL")
        return NextResponse.json({
            type: "stock",
            data
        })
    }

    // F1 intent
    if (lastMessage.includes("f1")) {
        const result = await getF1LastRaceWinner()
        return NextResponse.json({
            type: "f1",
            data: result
        })
    }

    // Fallback
    return NextResponse.json({
        type: "text",
        data: { content: "I can help with weather, stocks, or F1 data." }
    })
}
