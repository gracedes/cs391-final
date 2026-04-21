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

const PostTag = styled(Link)<{ $active?: boolean }>`
    background-color: ${({ $active }) => ($active ? "#FFFFFF" : "#D9D9D9")};
    color: #000000;
    border: ${({ $active }) => ($active ? "2px solid #5A7D7C" : "none")};
    border-radius: 4vw;
    padding: 0.3vw 0.5vw;
    text-decoration: none;
    display: inline-block;

    &:hover {
        background-color: #cfcfcf;
    }
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

const StyledTime = styled.p`
    color: #EAEAEA;
    margin: 0.3vw 0;
    font-size: 0.9rem;
`;

export default function PostPreview({post, activeTag,}: {
    post: PostProps;
    activeTag?: string;
}) {
    const uniqueTags = Array.from(new Set(post.tags));

    return (
        <PostPreviewBg>
            <StyledLink href={`/post/${post.id}`}>
                <PostPreviewHeader>
                    <PostTitle>{post.title}</PostTitle>
                </PostPreviewHeader>

                <StyledUsername>{post.username}</StyledUsername>
                <StyledContentPreview>
                    {post.content.length > 150
                        ? `${post.content.substring(0, 150)}...`
                        : post.content}
                </StyledContentPreview>

                <VoteSection>
                    <span>⬆ {post.upvotes}</span>
                    <span>⬇ {post.downvotes}</span>
                </VoteSection>

                <StyledTime>
                    {post.createdAt
                        ? new Date(post.createdAt).toLocaleString()
                        : ""}
                </StyledTime>
            </StyledLink>

            <TagsDiv>
                {uniqueTags.map((tag) => (
                    <PostTag
                        key={tag}
                        href={`/?tag=${encodeURIComponent(tag)}`}
                        $active={activeTag === tag}
                    >
                        {tag}
                    </PostTag>
                ))}
            </TagsDiv>
        </PostPreviewBg>
    );
}
