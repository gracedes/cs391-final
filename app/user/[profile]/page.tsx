"use client";

import {useParams} from "next/navigation";
import getProfile from "@/lib/getProfile";
import {UserProps} from "@/app/interfaces/UserProps";
import {useState} from "react";
import PostsDisplay from "@/app/components/PostDisplay";
import UserInfo from "@/app/components/profile/UserInfo";
import styled from "styled-components";

const ProfilePageDiv = styled.div`
    width: 100vw;
    height: 90vh;
    
    display: grid;
    grid-template-columns: 70vw 30vw;
`

export default function ProfilePage() {
    const username = window.location.pathname.split("/")[-1];
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