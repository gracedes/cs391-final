import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import getCollection, { USERS_COLLECTION } from "@/lib/db";

export async function POST(
    request: Request,
    context: { params: Promise<{ username: string }> }
) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username } = await context.params;

    const usersCollection = await getCollection(USERS_COLLECTION);

    await usersCollection.updateOne(
        { username: session.user.username },
        { $pull: { following: username } as any }
    );

    return NextResponse.json({ following: false });
}