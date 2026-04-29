
import {PostProps} from "@/app/interfaces/PostProps";
import getCollection, {POSTS_COLLECTION} from "@/lib/db";

//Jenny added sorting logic and  tag filter

type SortOrder = "newest" | "oldest";

export default async function getAllPosts(
    sortOrder: SortOrder = "newest",
    tag?: string
): Promise<PostProps[]> {
    const sortValue = sortOrder === "newest" ? -1 : 1;
    const filter = tag ? { tags: tag } : {};

    const postsCollection=await getCollection(POSTS_COLLECTION);

    const data=await postsCollection
        .find(filter)
        .sort({ createdAt: sortValue })
        .toArray();

    const posts:PostProps[]=data.map((p)=>
        (
            {
                id: p._id.toHexString(),
                title: p.title,
                username: p.username,
                tags: p.tags,
                content:p.content,
                image: p.image,
                upvotes:p.upvotes,
                downvotes:p.downvotes,
                latitude: p.latitude,
                longitude: p.longitude,
                createdAt: p.createdAt?.toISOString?.() ?? "",
            }
        )
    )

    return posts;
}