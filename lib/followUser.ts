//Jenny
// Server action to handle following a user.
// Adds the target username to the current user's "following" list in MongoDB.

"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import getCollection, { USERS_COLLECTION } from "@/lib/db";
import {FollowResponse} from "@/app/interfaces/FollowResponse";

export default async function followUser(usernameToFollow: string): Promise<FollowResponse> {
    const reqHeaders = await headers();

    const session = await auth.api.getSession({
        headers: reqHeaders,
    });

    if (!session || !session.user) {
        return { error: "Unauthorized", status: 401 };
    }

    const usersCollection = await getCollection(USERS_COLLECTION);

    await usersCollection.updateOne(
        { username: (session.user as any).username },
        { $addToSet: { following: usernameToFollow } as any }
    );

    return { following: true };
}