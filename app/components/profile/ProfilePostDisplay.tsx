"use client";

import PostPreview from "../PostPreview";
import {PostProps} from "@/app/interfaces/PostProps";
import styled from "styled-components";

// this function is just a modified version of the post display component
// used on the home page but with the width value modified to better fit
// the left side of the profile page
const BackgroundDiv = styled.div`
    background-color: #232C33;
    width: 100%;
    margin: -1vw auto 0 auto;
    height: calc(90vh + 1vw);
    overflow: scroll;
`;

export default function PostsDisplay({inputPosts}: {inputPosts: PostProps[]}) {
    return (
        <BackgroundDiv>
            {inputPosts.map((p) => <PostPreview key={p.id} post={p}/>)}
        </BackgroundDiv>
    );
}
