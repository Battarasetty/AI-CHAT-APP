import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/Message";

export async function GET() {
    /* ---------------------------
       1️⃣ Auth Check
    ---------------------------- */
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.email;

    /* ---------------------------
       2️⃣ DB Connect + Fetch Messages
    ---------------------------- */
    await connectDB();

    const messages = await Message.find({ userId })
        .sort({ createdAt: 1 }) // oldest → newest
        .lean();

    /* ---------------------------
       3️⃣ Return JSON Response
    ---------------------------- */
    return NextResponse.json(messages);
}
