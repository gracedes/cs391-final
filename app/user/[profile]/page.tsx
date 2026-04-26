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

    grid-template-columns: 1fr min(450px, 23vw);
    gap: 0;
    background-color: #232C33;
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