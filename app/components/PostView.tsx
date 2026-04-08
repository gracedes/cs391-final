"use client";

import { PostProps } from "@/app/interfaces/PostProps";
import styled from "styled-components";

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
    margin-top: 2vw;
    font-size: 1rem;
    font-weight: bold;
`;

const VoteText = styled.p`
    margin: 0;
`;

export default function PostView({ post }: { post: PostProps }) {
    const uniqueTags = Array.from(new Set(post.tags));

    return (
        <PostViewBg>
            <PostHeader>
                <TitleAndUser>
                    <PostTitle>{post.title}</PostTitle>
                    <Username>By {post.username}</Username>
                </TitleAndUser>

                <TagsDiv>
                    {uniqueTags.map((tag) => (
                        <PostTag key={tag}>{tag}</PostTag>
                    ))}
                </TagsDiv>
            </PostHeader>

            {post.image && <PostImage src={post.image} alt={post.title} />}

            <PostContent>{post.content}</PostContent>

            <VoteSection>
                <VoteText>⬆ Upvotes: {post.upvotes}</VoteText>
                <VoteText>⬇ Downvotes: {post.downvotes}</VoteText>
            </VoteSection>
        </PostViewBg>
    );
}