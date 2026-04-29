import {PostProps} from "@/app/interfaces/PostProps";

// user props
export interface UserProps {
    username: string;
    name: string;
    bio?: string;
    image: string;
    following?: string[];
    tags?: string[];
    posts?: PostProps[];
}