// Jenny Yang
// Get the currently logged-in user's document from MongoDB
// and retrieve the list of usernames they follow
import { PostProps } from "@/app/interfaces/PostProps";
import getCollection, { POSTS_COLLECTION, USERS_COLLECTION } from "@/lib/db";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export default async function getFollowingPosts(
    sortOrder: "newest" | "oldest" = "newest", tag?: string): Promise<PostProps[]> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session || !session.user){
        console.log("No active session found");
        return [];
    }

    const usersCollection = await getCollection(USERS_COLLECTION);

    const currentUserDoc = await usersCollection.findOne({
        username: (session.user as any).username,
    });

    const followedUsernames: string[] = currentUserDoc?.following || [];

    if (followedUsernames.length === 0) {
        return [];
    }

    const sortValue = sortOrder === "newest" ? -1 : 1;

    const filter = {
        username: { $in: followedUsernames },
        ...(tag ? { tags: tag } : {}),
    };

    const postsCollection = await getCollection(POSTS_COLLECTION);
    const data = await postsCollection
        .find(filter)
        .sort({ createdAt: sortValue })
        .toArray();

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
            createdAt: p.createdAt?.toISOString?.() ?? "",
        }
    ));

    return posts;
}