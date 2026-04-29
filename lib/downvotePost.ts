//Jenny
// Wrapper function for downvoting a post.
// Calls the shared voteOnPost logic with "down" as the vote type.

"use server"

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import voteOnPost from "@/lib/voteOnPost";
import {VoteResponse} from "@/app/interfaces/VoteResponse";

export default async function downvotePost(id: string): Promise<VoteResponse> {
    const reqHeaders = await headers();

    const session = await auth.api.getSession({
        headers: reqHeaders,
    });

    if (!session || !session.user) {
        return { error: "Unauthorized", status: 401 };
    }

    const updatedPost = await voteOnPost(id, session.user.id, "down");

    if (!updatedPost) {
        return { error: "Post not found", status: 404 };
    }

    return updatedPost;
}