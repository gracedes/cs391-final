import { PostProps } from "@/app/interfaces/PostProps";
import getCollection, { POSTS_COLLECTION } from "@/lib/db";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export default async function getFollowingPosts(    sortOrder: "newest" | "oldest" = "newest"
): Promise<PostProps[]> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session || !session.user){
        console.log("No active session found");
        return [];
    }

    const currentUser = session.user as any;
    const followedUsernames: string[] = currentUser.following || [];
    if (followedUsernames.length === 0) {
        return [];
    }

    const postsCollection = await getCollection(POSTS_COLLECTION);
    const data = await postsCollection.find({username: { $in: followedUsernames }}).toArray();
    const posts: PostProps[] = data.map((p) => (
        {
            id: p._id.toHexString(),
            title: p.title,
            username: p.username,
            tags: p.tags,
            content: p.content,
            image: p.image,
            upvotes: p.upvotes,
            downvotes: p.downvotes,
            latitude: p.latitude,
            longitude: p.longitude,
        }
    ));

    return posts.reverse();
}