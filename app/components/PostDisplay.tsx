/**
 * PostsDisplay – Client Component
 * ───────────────────────────────────────────────────────────────────────
 * • Renders a list of PostPreview components inside a shared background.
 * • Accepts optional children (e.g., sort bar) and an active tag for
 *   highlighting current tag filters.
 *
 * Author: Edward Reyna
 */

"use client";

import PostPreview from "./PostPreview";
import { PostProps } from "@/app/interfaces/PostProps";
import styled from "styled-components";
import { ReactNode } from "react";

const BackgroundDiv = styled.div`
    background-color: #232C33;
    width: 80vw;
    margin: 0 auto;
    min-height: 100vh;
    overflow: hidden;
`;

export default function PostsDisplay({inputPosts, children, activeTag,}: {
    inputPosts: PostProps[];
    children?: ReactNode;
    activeTag?: string;
}) {
    return (
        <BackgroundDiv>
            {/* Render any children (e.g., sort buttons) above the post list */}
            {children}
            {/* Each post is rendered using the PostPreview component */}
            {inputPosts.map((p) => (
                <PostPreview key={p.id} post={p} activeTag={activeTag} />
            ))}
        </BackgroundDiv>
    );
}