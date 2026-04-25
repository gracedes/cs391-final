import {PostProps} from "@/app/interfaces/PostProps";

export type VoteResponse = PostProps | { error: string; status: number };