import PostsDisplay from "@/app/components/PostDisplay";
import getFollowingPosts from "@/lib/getFollowingPosts";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import Link from "next/link";

export default async function FollowingPage({searchParams,}: {
    searchParams: Promise<{ sort?: string }>;
}){
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session || !session.user){
        redirect("/login")
    }

    const currentUser = session.user as any;
    if (!currentUser.username || currentUser.username.trim() === ""){
        redirect("/setup-username");
    }

    const params = await searchParams;
    const sortOrder = params.sort === "oldest" ? "oldest" : "newest";

    const followingPosts = await getFollowingPosts(sortOrder);

    return(
        <>
            <div style={{ margin: "1rem" }}>
                <Link href="/following?sort=newest">Newest to Oldest</Link>
                {" | "}
                <Link href="/following?sort=oldest">Oldest to Newest</Link>
            </div>

            <PostsDisplay inputPosts={followingPosts} />
        </>
    );
}