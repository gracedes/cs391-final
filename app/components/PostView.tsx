"use client";

import { PostProps } from "@/app/interfaces/PostProps";
import styled from "styled-components";
import {useState} from "react";
import {useEffect} from "react";


const StyledButton = styled.button`
    width: 8%;
    padding: 1%;
    border: none;
    border-radius: 8px;
    color: black;
    font-size: calc(2px + .7vw);
    cursor: pointer;

    &:hover {
        background-color: lightgrey;
    }
`;

const PostViewBg = styled.div`
    background-color: #5A7D7C;
    margin: 2vw auto;
    padding: 2vw;
    width: 80vw;
    border-radius: 1vw;
    color: #FFFFFF;
`;

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
`;

const TitleAndUser = styled.div`
    display: flex;
    flex-direction: column;
`;

const PostTitle = styled.h1`
    margin: 0;
    font-size: 2rem;
    color: #FFFFFF;
`;

const Username = styled.p`
    margin: 0.5vw 0 0 0;
    font-size: 1rem;
    color: #EAEAEA;
`;

const TagsDiv = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

const PostTag = styled.button`
    background-color: #D9D9D9;
    color: #000000;
    border: none;
    border-radius: 4vw;
    padding: 0.3vw 0.8vw;
    cursor: default;
`;

const PostImage = styled.img`
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    margin: 1.5vw 0;
    border-radius: 1vw;
`;

const PostContent = styled.p`
    font-size: 1.1rem;
    line-height: 1.7;
    white-space: pre-wrap;
`;

const VoteSection = styled.div`
    display: flex;
    gap: 1.5rem;
    margin: .5vw 0;
    font-size: 1rem;
    font-weight: bold;
`;

const VoteText = styled.p`
    margin: 0;
`;

const PostTime = styled.p`
    margin-top: 1vw;
    font-size: 0.95rem;
    color: #EAEAEA;
`;

export default function PostView({ post }: { post: PostProps }) {
    const [upvotes, setUpvotes] = useState(post.upvotes);
    const [downvotes, setDownvotes] = useState(post.downvotes);

    const [userVote, setUserVote] = useState<"up" | "down" | null>(
        post.currentUserVote ?? null
    );

    // Using document.title since this is a client component (metadata not supported),
    // so we google how else to implement the title
    useEffect(() => {
        document.title = `Revival | ${post.title}`;
    }, [post.title]);

    async function handleUpvote() {
        const response = await fetch(`/api/posts/${post.id}/upvote`, {
            method: "POST",
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Upvote failed:", response.status, errorText);
            return;
        }

        const updatedPost = await response.json();
        setUpvotes(updatedPost.upvotes);
        setDownvotes(updatedPost.downvotes);
        setUserVote("up");
    }

    async function handleDownvote() {
        const response = await fetch(`/api/posts/${post.id}/downvote`, {
            method: "POST",
        });

        if (!response.ok) {
            console.error("Failed to downvote");
            return;
        }

        const updatedPost = await response.json();
        setUpvotes(updatedPost.upvotes);
        setDownvotes(updatedPost.downvotes);
        setUserVote("down");
    }

    return (
        <PostViewBg>
            <PostHeader>
                <TitleAndUser>
                    <PostTitle>{post.title}</PostTitle>
                    <Username>By {post.username}</Username>
                </TitleAndUser>

                <TagsDiv>
                    {post.tags.map((tag) => (
                        <PostTag key={tag}>{tag}</PostTag>
                    ))}
                </TagsDiv>
            </PostHeader>

            {post.image && <PostImage src={post.image} alt={post.title} />}

            <PostContent>{post.content}</PostContent>

            <VoteSection>
                <StyledButton onClick={handleUpvote} disabled={userVote === "up"}>
                    ⬆ Upvote
                </StyledButton>
                <VoteText>{upvotes}</VoteText>

                <StyledButton onClick={handleDownvote} disabled={userVote === "down"}>
                    ⬇ Downvote
                </StyledButton>
                <VoteText>{downvotes}</VoteText>
            </VoteSection>
            <PostTime>{post.createdAt
                ? new Date(post.createdAt).toLocaleString()
                : ""}</PostTime>
        </PostViewBg>
    );
}