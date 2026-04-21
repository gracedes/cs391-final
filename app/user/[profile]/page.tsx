"use client";

import UserInfo from "@/app/components/profile/UserInfo";
import styled from "styled-components";
import { useParams } from "next/navigation";

const ProfilePageDiv = styled.div`
    width: 100vw;
    height: 90vh;
    
    display: grid;
    grid-template-columns: auto min(600px, 35vw);
`

export default function ProfilePage() {
    const params = useParams();
    const username = params.profile as string;
    console.log("username: ", username);

    return (
        <ProfilePageDiv>
            <div>
                <p>this is where the posts go</p>
            </div>
            <UserInfo username={username}/>
        </ProfilePageDiv>
    )
}