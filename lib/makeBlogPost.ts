"use server";

import { PostProps } from "@/app/interfaces/PostProps";
import getCollection, {POSTS_COLLECTION} from "@/lib/db";


export default async function makeBlogPost(title:string, content:string, tags: string[], username: string):Promise<PostProps | null>{
    const p ={
        title: title,
        username: username,
        content: content,
        tags: tags,
        upvotes: 0,
        downvotes: 0,
    }

    const postsCollection = await getCollection(POSTS_COLLECTION);
    const res = await postsCollection.insertOne(p);

    if(!res.acknowledged){
        return null;
    }

    const { _id, ...safePostData } = p as any;

    return {...safePostData, id: res.insertedId.toHexString()};
}