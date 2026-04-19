import getCollection, { POSTS_COLLECTION } from "@/lib/db";
import { ObjectId } from "mongodb";
import { PostProps } from "@/app/interfaces/PostProps";

type VoteType = "up" | "down";

interface VoteEntry {
    userId: string;
    type: VoteType;
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

export default async function voteOnPost(
    postId: string,
    userId: string,
    voteType: VoteType
): Promise<PostProps | null> {
    const postsCollection = await getCollection(POSTS_COLLECTION);
    const objectId = ObjectId.createFromHexString(postId);

    const post = await postsCollection.findOne({ _id: objectId }) as PostDocument | null;

    if (!post) {
        return null;
    }

    const votes = post.votes ?? [];
    const existingVote = votes.find((vote) => vote.userId === userId);

    let newUpvotes = post.upvotes;
    let newDownvotes = post.downvotes;
    let newVotes = [...votes];

    if (!existingVote) {
        if (voteType === "up") {
            newUpvotes += 1;
        } else {
            newDownvotes += 1;
        }

        newVotes.push({ userId, type: voteType });
    } else if (existingVote.type === voteType) {
        // same vote again → do nothing
    } else {
        if (voteType === "up") {
            newUpvotes += 1;
            newDownvotes -= 1;
        } else {
            newDownvotes += 1;
            newUpvotes -= 1;
        }

        newVotes = newVotes.map((vote) =>
            vote.userId === userId ? { ...vote, type: voteType } : vote
        );
    }

    const result = await postsCollection.updateOne(
        { _id: objectId },
        {
            $set: {
                upvotes: newUpvotes,
                downvotes: newDownvotes,
                votes: newVotes,
            },
        }
    );

    console.log("vote update result:", result);

    return {
        id: postId,
        title: post.title,
        username: post.username,
        tags: post.tags,
        content: post.content,
        image: post.image,
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        longitude: post.longitude,
        latitude: post.latitude,
    };
}