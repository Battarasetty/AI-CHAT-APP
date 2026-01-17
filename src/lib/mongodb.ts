// src/lib/mongodb.ts
import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local")
}

const client = new MongoClient(process.env.MONGODB_URI)

// Ensure client connects once (singleton pattern)
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
    // In development, use a global variable
    if (!globalThis._mongoClientPromise) {
        globalThis._mongoClientPromise = client.connect()
    }
    clientPromise = globalThis._mongoClientPromise
} else {
    // In production, connect normally
    clientPromise = client.connect()
}

export { clientPromise }
