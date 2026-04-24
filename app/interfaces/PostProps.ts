export interface PostProps {
    id: string;
    title: string;
    username: string;
    tags: string[];
    content: string;
    image?: string;
    upvotes: number;
    downvotes: number;
    currentUserVote?: "up" | "down" | null;
    longitude?: number;
    latitude?: number;
    createdAt: string;
}
