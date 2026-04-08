export interface PostProps {
    id: string;
    title: string;
    username: string;
    tags: string[];
    content: string;
    image?: string;
    upvotes: number;
    downvotes: number;
    longitude: number;
    latitude: number;
}
