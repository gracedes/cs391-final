"use client";

import UserInfo from "@/app/components/profile/UserInfo";
import styled from "styled-components";
import { useParams } from "next/navigation";

const ProfilePageDiv = styled.div`
    width: 100vw;
    height: 90vh;
    
    display: grid;
    grid-template-columns: 70vw 30vw;
`

export default function ProfilePage() {
    const params = useParams();
    const username = params.profile as string;
    console.log("username: ", username);

    return (
        <ProfilePageDiv>
            <div>
                this is where the posts go
            </div>
            <UserInfo username={username}/>
        </ProfilePageDiv>
    )
}