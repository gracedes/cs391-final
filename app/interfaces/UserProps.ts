import {PostProps} from "@/app/interfaces/PostProps";

export interface UserProps {
    username: string;
    nickname: string;
    bio?: string;
    pfp: string;
    following?: string[];
    tags?: string[];
    posts?: PostProps[];
}