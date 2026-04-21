"use client";

import PostPreview from "./PostPreview";
import {PostProps} from "@/app/interfaces/PostProps";
import styled from "styled-components";
import { ReactNode } from "react";

const BackgroundDiv = styled.div`
    background-color: #232C33;
    width: 80vw;
    margin: 0 auto;
    min-height: 100vh;
    overflow: hidden;
`;

export default function PostsDisplay({inputPosts, children,activeTag,}: {inputPosts: PostProps[];children?: ReactNode;    activeTag?: string;
}) {
    return (
        <BackgroundDiv>
            {children}
            {inputPosts.map((p) => (
                <PostPreview key={p.id} post={p} activeTag={activeTag} />
            ))}
        </BackgroundDiv>
    );
}
