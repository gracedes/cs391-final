"use server";

import { PostProps } from "@/app/interfaces/PostProps";
import getCollection, { POSTS_COLLECTION } from "@/lib/db";

export default async function getProfilePosts(username:string):Promise<PostProps[]|null> {
    const collection = await getCollection(POSTS_COLLECTION);
    const data = await collection.find({username: username}).toArray();
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
        }
    ));

    if (posts.length > 0) {
        return posts.reverse();
    } else {return null}
}