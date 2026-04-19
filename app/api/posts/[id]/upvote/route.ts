import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import voteOnPost from "@/lib/voteOnPost";

export async function POST(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const updatedPost = await voteOnPost(id, session.user.id, "up");

    if (!updatedPost) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
}