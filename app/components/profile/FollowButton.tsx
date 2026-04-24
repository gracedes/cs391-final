"use client";

import { useState } from "react";
import styled from "styled-components";

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

export default function FollowButton({
                                         profileUsername,
                                         initiallyFollowing,
                                     }: {
    profileUsername: string;
    initiallyFollowing: boolean;
}) {
    const [following, setFollowing] = useState(initiallyFollowing);

    async function handleClick() {
        const route = following ? "unfollow" : "follow";

        const response = await fetch(`/api/users/${profileUsername}/${route}`, {
            method: "POST",
        });

        if (!response.ok) {
            console.error("Failed to update follow status");
            return;
        }

        const data = await response.json();
        setFollowing(data.following);
    }

    return (
        <Button onClick={handleClick}>
            {following ? "Unfollow" : "Follow"}
        </Button>
    );
}