"use server";

import getCollection from "@/lib/db";

export async function isUsernameAvailable(username: string): Promise<boolean> {
    const usersCollection = await getCollection("user");
    const existingUser = await usersCollection.findOne({ username: username});
    return existingUser === null;
}