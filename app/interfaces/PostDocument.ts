import { ObjectId } from "mongodb";

export interface VoteEntry {
    userId: string;
    type: "up" | "down";
}

export interface PostDocument {
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
    votes: VoteEntry[];
}