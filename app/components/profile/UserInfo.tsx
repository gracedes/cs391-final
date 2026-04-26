"use client";

import getProfile from "@/lib/getProfile";
import {useEffect, useState} from "react";
import {UserProps} from "@/app/interfaces/UserProps";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const UserInfoDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto 1fr auto auto;
    background-color: #5A7D7C;
    padding: max(2vh, 2vw);
    grid-row-gap: 0;
    color: white;
    overflow: hidden;

    .pfp {
        grid-column: 1;
        grid-row: 1;
        position: relative;

        width: 50%;
        aspect-ratio: 1 / 1;

        justify-self: center;
        margin-bottom: 2vh;
    }

    .pfp img {
        object-fit: cover;
    }

    h1 {
        grid-column: 1;
        grid-row: 2;
        font-size: clamp(22px, 3vw, 40px);
        margin: 0;
        line-height: 1;
    }

    h3 {
        grid-column: 1;
        grid-row: 3;
        padding-bottom: 0.75vh;
        font-style: italic;
        font-size: clamp(14px, 2vw, 28px);
        margin: 0;
        line-height: 1.1;
    }

    .newPost {
        grid-row: auto;
        margin-top: 1vh;
        background-color: #232C33;
        line-height: 5vh;
        text-align: center;

        width: 95%;
        justify-self: center;

        color: white;
        font-size: clamp(16px, 2vw, 30px);
        border-style: none;
        text-decoration: none;
        font-style: italic;
        display: block;
        transition-duration: 0.25s;
        transition-property: background-color;

        white-space: nowrap;
        overflow: hidden;

        &:hover {
            background-color: #1f282e;
        }
    }

    p {
        grid-column: 1;
        grid-row: 4;
        overflow: scroll;
        font-size: clamp(12px, 1.5vw, 22px);
        margin: 1vh 0 0 0;
    }

    h2 {
        grid-row: 5;
    }
`;
export default function UserInfo({ username }: { username: string }) {
    const [profile, setProfile] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfile(username).then((data) => {
            setProfile(data);
            setLoading(false);
        });
    }, [username]);

    if (loading) return (<UserInfoDiv><p>Loading...</p></UserInfoDiv>);

    if (!profile) {
        return (<UserInfoDiv><p>No profile found at that username :(</p></UserInfoDiv>);
    }

    return (
        <UserInfoDiv>
            <div className="pfp">
                <Image src={profile.image} fill={true} alt={"user's profile picture"}/>
            </div>
            <h1>{profile.name}</h1>
            <h3>{"@" + profile.username}</h3>
            <p>{profile.bio}</p>
            <Link href={"/blog-post-creation-page"} className={"newPost"}>New Post</Link>
        </UserInfoDiv>
    )
}