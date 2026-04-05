import Link from "next/link";
import {PostProps} from "@/lib/PostProps";
import styled from "styled-components";

const PostPreviewBg = styled.div`
    background-color: #5A7D7C;
`;

const PostPreviewHeader = styled.div`
    display: flex;
`;

const PostTitle = styled.h1`
    color: #FFFFFF;
`;

const PostTag = styled.button`
    background-color: #D9D9D9;
    color: #000000;
`;

export default function PostPreview({post}: { post: PostProps }) {
    return (
        <Link href={`/post/${post.id}`}>
            <PostPreviewBg>
                <PostPreviewHeader>
                    <PostTitle>{post.title}</PostTitle>
                    {post.tags.map((tag) => <PostTag>{tag}</PostTag>)}
                </PostPreviewHeader>
                <p>{post.username}</p>
                <p>{post.content}</p>
            </PostPreviewBg>
        </Link>
    );
}
