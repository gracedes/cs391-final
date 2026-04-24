"use client";

import UserInfo from "@/app/components/profile/UserInfo";
import UserPosts from "@/app/components/profile/UserPosts"
import styled from "styled-components";
import { useParams } from "next/navigation";
import {useEffect} from "react";

const ProfilePageDiv = styled.div`
    width: 100vw;
    height: 90vh;
    
    display: grid;
    grid-template-columns: auto min(600px, 35vw);
`

export default function ProfilePage() {
    const params = useParams();
    const username = params.profile as string;

    useEffect(() => {
        document.title = `Revival | ${username}`;
    }, [username]);

    return (
        <ProfilePageDiv>
            <UserPosts username={username} />
            <UserInfo username={username}/>
        </ProfilePageDiv>
    )
}