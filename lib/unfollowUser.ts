//Jenny
// Server action to handle unfollowing a user.
// Removes the target username from the current user's "following" list in MongoDB.


"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import getCollection, { USERS_COLLECTION } from "@/lib/db";
import {FollowResponse} from "@/app/interfaces/FollowResponse";

export default async function unfollowUser(usernameToUnfollow: string): Promise<FollowResponse> {
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
        { $pull: { following: usernameToUnfollow } as any }
    );

    return { following: false };
}