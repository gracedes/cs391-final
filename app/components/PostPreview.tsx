import Link from "next/link";
import {PostProps} from "@/app/interfaces/PostProps";
import styled from "styled-components";

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const PostPreviewBg = styled.div`
    background-color: #5A7D7C;
    margin: 1vw;
    padding: 1vw;
`;

const PostPreviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PostTitle = styled.h1`
    color: #FFFFFF;
`;

const TagsDiv = styled.div`
    display: flex;
    gap: 8px;
`;

const PostTag = styled.button`
    background-color: #D9D9D9;
    color: #000000;
    border: none;
    border-radius: 4vw;
    padding: 0.3vw 0.5vw;
`;

const StyledUsername = styled.p`
    color: #FFFFFF;
    margin: 0.5vw 0;
`;

const StyledContentPreview = styled.p`
    color: #FFFFFF;
`;

const VoteSection = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    color: #FFFFFF;
    font-weight: bold;
`;

export default function PostPreview({post}: { post: PostProps }) {
    const uniqueTags = Array.from(new Set(post.tags));

    return (
        <StyledLink href={`/post/${post.id}`}>
            <PostPreviewBg>
                <PostPreviewHeader>
                    <PostTitle>{post.title}</PostTitle>
                    <TagsDiv>
                        {uniqueTags.map((tag) => <PostTag key={tag}>{tag}</PostTag>)}
                    </TagsDiv>
                </PostPreviewHeader>
                <StyledUsername>{post.username}</StyledUsername>
                <StyledContentPreview>{post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}</StyledContentPreview>
                <VoteSection>
                    <span>⬆ {post.upvotes}</span>
                    <span>⬇ {post.downvotes}</span>
                </VoteSection>
            </PostPreviewBg>
        </StyledLink>
    );
}
