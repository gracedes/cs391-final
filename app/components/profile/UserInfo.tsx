"use client";

import getProfile from "@/lib/getProfile";
import {useEffect, useState} from "react";
import {UserProps} from "@/app/interfaces/UserProps";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import FollowButton from "@/app/components/profile/FollowButton";

const FollowButtonWrapper = styled.div`
    grid-column: 1 / 3;
    grid-row: 5;
    margin-top: 1rem;
`;

const UserInfoDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 4vh;
    grid-template-rows: calc(min(600px, 35vw) - 2 * max(2vh, 2vw)) fit-content(3vh) fit-content(2vh) fit-content(50vh) auto 5vh;
    background-color: #5A7D7C;
    padding: max(2vh, 2vw) max(2vh, 2vw);
    grid-row-gap: 0.5vh;
    color: white;
    overflow: hidden;
    
    .pfp {
        grid-column: 1/3;
        grid-row: 1;
        position: relative;
    }
    
    h1 {
        grid-column: 1;
        grid-row: 2;
        font-size: calc(12px + 1.5vw);
    }
    
    h3 {
        grid-column: 1;
        grid-row: 3;
        padding-bottom: 0.75vh;
        font-style: italic;
        font-size: calc(7px + 1.25vw);
    }
    
    .newPost {
        grid-column: 1/3;
        grid-row: 6;
        background-color: #232C33;
        line-height: 5vh;
        width: 1fr;
        color: white;
        font-size: calc(12px + 1.5vw);
        border-style: none;
        text-align: center;
        text-decoration: none;
        font-style: italic;
        display: block;
        transition-duration: 0.25s;
        transition-property: background-color;
        &:hover {
            background-color: #1f282e;
        }
    }
    
    p {
        grid-column: 1/3;
        grid-row: 4;
        overflow: scroll;
        font-size: calc(5px + 1.25vw);
    }
    
    h2 {
        grid-row: 5;
    }
`;

export default function UserInfo({
                                     username,
                                     currentUsername,
                                     initiallyFollowing,
                                 }: {
    username: string;
    currentUsername?: string;
    initiallyFollowing?: boolean;
}) {
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
                <Image src={profile.image} fill={true} alt={"users's profile picture"}/>
            </div>
            <h1>{profile.name}</h1>
            <h3>{"@" + profile.username}</h3>
            {currentUsername && currentUsername !== profile.username && (
                <FollowButtonWrapper>
                    <FollowButton
                        profileUsername={profile.username}
                        initiallyFollowing={initiallyFollowing ?? false}
                    />
                </FollowButtonWrapper>
            )}
            <p>{profile.bio}</p>
            {currentUsername === profile.username && (
                <Link href="/blog-post-creation-page" className="newPost">
                    New Post
                </Link>
            )}
        </UserInfoDiv>
    )
}