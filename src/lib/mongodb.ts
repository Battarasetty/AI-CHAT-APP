import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI in .env.local");
}

/* ---------------------------
   1️⃣ For Mongoose (App DB)
---------------------------- */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

/* ---------------------------
   2️⃣ For NextAuth Adapter (MongoClient)
---------------------------- */
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error("Please add MONGODB_URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
    // In development, use a global variable
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(MONGODB_URI);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    // In production, no global
    client = new MongoClient(MONGODB_URI);
    clientPromise = client.connect();
}

export { clientPromise };
