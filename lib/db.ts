/**
 * DATABASE CONNECTION & HELPERS
 * ───────────────────────────────────────────────────────────────────────
 * • Exports a shared MongoDB client and database instance.
 * • In development, reuses the client across hot reloads to avoid
 *   connection exhaustion (singleton pattern).
 * • Provides a helper to retrieve a specific collection by name.
 *
 * Author: Edward Reyna
 */

import { Collection, MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error("Something is wrong with your key");
}

const DB_NAME = "cs391-final";

// Collection names used across the app.
export const POSTS_COLLECTION = "posts-collection";
export const USERS_COLLECTION = "user";

let client: MongoClient;

// In development, attach the client to the global object so that it survives
// hot reloads (prevents multiple connections).
if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global as typeof globalThis & {
        _mongoClient?: MongoClient;
    };
    if (!globalWithMongo._mongoClient) {
        globalWithMongo._mongoClient = new MongoClient(MONGO_URI);
    }
    client = globalWithMongo._mongoClient;
} else {
    // Production: simple new instance (no hot reload).
    client = new MongoClient(MONGO_URI);
}

// The connected database instance can be used directly.
export const mongoDb = client.db(DB_NAME);

/**
 * Returns a MongoDB collection by name, ensuring the client is connected first.
 * @param collectionName - The name of the collection (e.g., "posts-collection").
 */
export default async function getCollection(collectionName: string): Promise<Collection> {
    await client.connect();
    return client.db(DB_NAME).collection(collectionName);
}