//Jenny
// Client component for handling follow/unfollow interactions.
// Toggles follow state and communicates with server actions to update MongoDB.

"use client";

import { useState } from "react";
import styled from "styled-components";
import unfollowUser from "@/lib/unfollowUser";
import followUser from "@/lib/followUser";

const Button = styled.button`
    width: 100%;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 4px; 
    background-color: #232C33;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease, opacity 0.2s ease;

    &:hover {
        background-color: #1f282e;
    }
`;

export default function FollowButton({profileUsername, initiallyFollowing}: { profileUsername: string; initiallyFollowing: boolean; }) {
    const [following, setFollowing] = useState(initiallyFollowing);

    async function handleClick() {
        const action = following ? unfollowUser : followUser;

        const result = await action(profileUsername);

        if ('error' in result) {
            console.error("Failed to update follow status:", result.error);
            return;
        }

        setFollowing(result.following);
    }

    return (
        <Button onClick={handleClick}>
            {following ? "Unfollow" : "Follow"}
        </Button>
    );
}