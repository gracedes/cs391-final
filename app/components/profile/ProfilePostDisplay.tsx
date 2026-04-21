"use client";

import PostPreview from "../PostPreview";
import {PostProps} from "@/app/interfaces/PostProps";
import styled from "styled-components";

const BackgroundDiv = styled.div`
    background-color: #232C33;
    width: calc(100vw - min(600px, 35vw));
    margin: -1vw auto 0 auto;
    min-height: 100vh;
    overflow: hidden;
`;

export default function PostsDisplay({inputPosts}: {inputPosts: PostProps[]}) {
    return (
        <BackgroundDiv>
            {inputPosts.map((p) => <PostPreview key={p.id} post={p}/>)}
        </BackgroundDiv>
    );
}
