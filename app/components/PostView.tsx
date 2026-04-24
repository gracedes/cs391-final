"use client";

import { PostProps } from "@/app/interfaces/PostProps";
import styled from "styled-components";
import {useState} from "react";
import {useEffect} from "react";
import Link from "next/link";

const StyledButton = styled.button`
    width: 10%;
    padding: 1%;
    border: none;
    border-radius: 8px;
    color: black;
    font-size: calc(2px + .9vw);
    cursor: pointer;

    &:hover {
        background-color: lightgrey;
    }
    @media (max-width: 1000px) {
        width: 16%;
        padding: 1.6%;
        margin-bottom: 1.5%;
        border: none;
        border-radius: 8px;
        color: black;
        font-size: calc(2px + 1.3vw);
        cursor: pointer;

        &:hover {
            background-color: lightgrey;
        }
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

const UsernameLink = styled(Link)`
    margin: 0.5vw 0 0 0;
    font-size: 1rem;
    color: #EAEAEA;
`;

const TagsDiv = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

const PostTag = styled(Link)<{ $active?: boolean }>`
    background-color: ${({ $active }) => ($active ? "#FFFFFF" : "#D9D9D9")};
    color: #000000;
    border: ${({ $active }) => ($active ? "2px solid #5A7D7C" : "none")};
    border-radius: 4vw;
    padding: 0.3vw 0.8vw;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;

    &:hover {
        background-color: #cfcfcf;
    }
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
    margin-top: .8%;
    font-size: calc(2px + 1.4vw);
    @media (max-width: 1000px) {
        margin-top: 1.6%;
        font-size: calc(2px + 2vw);
    }
`;

const PostTime = styled.p`
    margin-top: 1vw;
    font-size: 0.95rem;
    color: #EAEAEA;
`;

export default function PostView({post, activeTag,}: {
    post: PostProps;
    activeTag?: string;
}){
    const [upvotes, setUpvotes] = useState(post.upvotes);
    const [downvotes, setDownvotes] = useState(post.downvotes);

    const [userVote, setUserVote] = useState<"up" | "down" | null>(
        post.currentUserVote ?? null
    );

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
                    <Username>By <UsernameLink href={"/user/" + post.username}>{post.username}</UsernameLink></Username>
                </TitleAndUser>

                <TagsDiv>
                    {post.tags.map((tag) => (
                        <PostTag
                            key={tag}
                            href={`/?tag=${encodeURIComponent(tag)}`}
                            $active={activeTag === tag}
                        >
                            {tag}
                        </PostTag>
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