"use client";

import {useEffect, useState} from "react";
import {PostProps} from "@/app/interfaces/PostProps";
import getProfilePosts from "@/lib/getProfilePosts";
import PostsDisplay from "@/app/components/profile/ProfilePostDisplay";
import styled from "styled-components";

// fill width of left side of the profile page
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

export default function UserPosts({ username }: { username: string }) {
    // posts are stored as an array of post props
    const [posts, setPosts] = useState<PostProps[] | null>(null);
    const [loading, setLoading] = useState(true);

    // fetch posts from backend
    useEffect(() => {
        getProfilePosts(username).then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, [username]);

    if (loading) return (
        <StyledWrapper>
            <StyledText>Loading...</StyledText>
        </StyledWrapper>
    );

    if (!posts) {
        return (
            <StyledWrapper>
                <StyledText>User has not made any posts yet!</StyledText>
            </StyledWrapper>
        );
    }

    return (<PostsDisplay inputPosts={posts} />);
}