import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, tags, description } = body;

        if (!title || !description) {
            return NextResponse.json(
                { error: "Title and description are required." },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const result = await db.collection("posts").insertOne({
            title,
            tags,
            description,
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: "Post created", insertedId: result.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to save post." },
            { status: 500 }
        );
    }
}