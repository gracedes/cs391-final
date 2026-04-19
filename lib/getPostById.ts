import { PostProps } from "@/app/interfaces/PostProps";
import getCollection, { POSTS_COLLECTION } from "@/lib/db";
import { ObjectId } from "mongodb";

interface VoteEntry {
    userId: string;
    type: "up" | "down";
}

interface PostDocument {
    _id: ObjectId;
    title: string;
    username: string;
    tags: string[];
    content: string;
    image?: string;
    upvotes: number;
    downvotes: number;
    longitude?: number;
    latitude?: number;
    votes?: VoteEntry[];
}

export default async function getPostById(
    id: string,
    currentUserId?: string
): Promise<PostProps | null> {
    const postId = ObjectId.createFromHexString(id);

    const postsCollection = await getCollection(POSTS_COLLECTION);
    const data = await postsCollection.findOne({ _id: postId }) as PostDocument | null;

    if (data == null) {
        return null;
    }

    const currentVote =
        data.votes?.find((vote) => vote.userId === currentUserId)?.type ?? null;

    return {
        id,
        title: data.title,
        username: data.username,
        tags: data.tags,
        content: data.content,
        image: data.image,
        upvotes: data.upvotes,
        downvotes: data.downvotes,
        longitude: data.longitude,
        latitude: data.latitude,
        currentUserVote: currentVote,
    };
}