import { PostProps } from "@/app/interfaces/PostProps";
import getCollection, { USERS_COLLECTION, POSTS_COLLECTION } from "@/lib/db";
import {ObjectId} from "mongodb";

export default async function getDownvote(id: string): Promise<PostProps|null> {
    const postId = ObjectId.createFromHexString(id);

    const postsCollection = await getCollection(POSTS_COLLECTION);
    const data = await postsCollection.findOne({_id:postId});
    if(data==null){
        return null;
    }

    return {
        id: id,
        title: data.title,
        username: data.username,
        tags: data.tags,
        content: data.content,
        image: data.image,
        upvotes: data.upvotes,
        downvotes: data.downvotes,
        longitude: data.longitude,
        latitude: data.latitude
    };
}