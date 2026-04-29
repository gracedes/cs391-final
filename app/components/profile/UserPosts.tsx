"use client";

// Responsible: Elizabeth
// Purpose: This component loads and displays all blog posts for a specific user.
// It shows a loading message while fetching posts and a fallback message if the user has no posts.

import { useEffect, useState } from "react";
import { PostProps } from "@/app/interfaces/PostProps";
import getProfilePosts from "@/lib/getProfilePosts";
import PostsDisplay from "@/app/components/profile/ProfilePostDisplay";
import styled from "styled-components";

const StyledWrapper = styled.div`
    width: 100%;
    min-height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-sizing: border-box;
`;

const StyledText = styled.p`
    font-size: calc(2px + 2vw);
    color: white;
    text-align: center;
    font-style: italic;
    margin: 0;
`;

// Responsible: Elizabeth
// UserPosts receives a username and fetches that user's posts.
// This is a client component because it uses useState and useEffect
// to load profile posts after the component renders.
export default function UserPosts({ username }: { username: string }) {
    // Stores the posts returned from the database/helper function.
    // It starts as null because the posts have not been loaded yet.
    const [posts, setPosts] = useState<PostProps[] | null>(null);

    // Tracks whether the posts are still being fetched.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch posts for the current username whenever the username changes.
        getProfilePosts(username).then((data) => {
            // Save the fetched posts in state so they can be displayed.
            setPosts(data);

            // Once the data has been received, stop showing the loading message.
            setLoading(false);
        });
    }, [username]);

    // While the data is loading, show a centered loading message.
    if (loading) {
        return (
            <StyledWrapper>
                <StyledText>Loading...</StyledText>
            </StyledWrapper>
        );
    }

    // If no posts were returned, show a message instead of the post list.
    if (!posts) {
        return (
            <StyledWrapper>
                <StyledText>User has not made any posts yet!</StyledText>
            </StyledWrapper>
        );
    }

    // If posts exist, pass them into the display component.
    return <PostsDisplay inputPosts={posts} />;
}