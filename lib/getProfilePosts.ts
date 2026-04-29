"use server";

import { PostProps } from "@/app/interfaces/PostProps";
import getCollection, { POSTS_COLLECTION } from "@/lib/db";

export default async function getProfilePosts(username:string):Promise<PostProps[]|null> {
    // get posts which are by the username provided
    const collection = await getCollection(POSTS_COLLECTION);
    const data = await collection.find({username: username}).toArray();
    // map that data into a PostProps array
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
            longitude: p.longitude,
            latitude: p.latitude,
            createdAt: p.createdAt
        }
    ));

    if (posts.length > 0) {
        // return in reverse for newest to oldest
        return posts.reverse();
    } else {return null}
}