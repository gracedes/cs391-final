// Jenny
// Defines the structure of the response returned after a vote action.
// Used to update the frontend with the latest vote counts and user vote state.

import {PostProps} from "@/app/interfaces/PostProps";

export type VoteResponse = PostProps | { error: string; status: number };