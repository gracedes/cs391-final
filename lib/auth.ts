/**
 * AUTH CONFIGURATION (Server-Side)
 * ───────────────────────────────────────────────────────────────────────
 * • Configures better-auth with the MongoDB adapter and custom user fields.
 * • Adds 'following' (array of user IDs) and 'username' fields to the user
 *   schema.
 * • Enables Google OAuth via the provided client ID and secret.
 *
 * Author: Edward Reyna
 */

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { mongoDb } from "@/lib/db";

export const auth = betterAuth({
    // Connect to MongoDB using the shared database instance.
    database: mongodbAdapter(mongoDb),
    user: {
        additionalFields: {
            // Stores an array of user IDs that the current user follows.
            following: {
                type: "string",
                defaultValue: [],
            },
            // Username field, editable via the client (input: true).
            username: {
                type: "string",
                defaultValue: "",
                input: true,
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});