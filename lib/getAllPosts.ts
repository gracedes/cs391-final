
import {PostProps} from "@/app/interfaces/PostProps";
import getCollection, {POSTS_COLLECTION} from "@/lib/db";

export default async function getAllPosts():Promise<PostProps[]>{

    const postsCollection=await getCollection(POSTS_COLLECTION);
    const data=await postsCollection.find().toArray();

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
            }
        )
    )

    return posts.reverse();
}