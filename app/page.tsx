import getAllPosts from "@/lib/getAllPosts";
import PostsDisplay from "@/app/components/PostDisplay";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Revival | Discover",
    description: "Revival's Discover page",
};

export default async function Home({searchParams,}: { searchParams: Promise<{ sort?: string }>;
}) {
    const params = await searchParams;
    const sortOrder = params.sort === "oldest" ? "oldest" : "newest";

    const posts = await getAllPosts(sortOrder);

    return (
        <>
            <div style={{ margin: "1rem" }}>
                <Link href="/?sort=newest">Newest to Oldest</Link>
                {" | "}
                <Link href="/?sort=oldest">Oldest to Newest</Link>
            </div>

            <PostsDisplay inputPosts={posts} />
        </>
    );
}