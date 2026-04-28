"use client";

import getProfile from "@/lib/getProfile";
import {useEffect, useState} from "react";
import {UserProps} from "@/app/interfaces/UserProps";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import FollowButton from "@/app/components/profile/FollowButton";
import updateProfile from "@/lib/updateProfile";

const FollowButtonWrapper = styled.div`
    grid-column: 1 / 3;
    grid-row: 5;
    margin-top: 1rem;
`;

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

        width: 80%;
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
    
    .nameInput {
        grid-column: 1;
        grid-row: 2;
        width: 100%;
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
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState<string | undefined>("");

    useEffect(() => {
        getProfile(username).then((data) => {
            setProfile(data);
            setLoading(false);
            if (data) {
                setName(data.name);
                setBio(data.bio);
            }
        });
    }, [username]);

    const sendProfileUpdate = () => {
        if (profile) {
            updateProfile(profile.username, name, (bio !== undefined ? bio : ""));
        }
        setEditing(false);
    }

    if (loading) return (<UserInfoDiv><p>Loading...</p></UserInfoDiv>);

    if (!profile) {
        return (<UserInfoDiv><p>No profile found at that username :(</p></UserInfoDiv>);
    }

    return (
        <UserInfoDiv>
            <div className="pfp">
                <Image src={profile.image} fill={true} alt={"users's profile picture"}/>
            </div>
            {!editing ?
                (<h1>{profile.name}</h1>) :
                (<input className={"nameInput"} value={name} aria-label={"name"} onChange={(e) => (setName(String(e.target.value)))}/>)}
            <h3>{"@" + profile.username}</h3>
            {currentUsername && currentUsername !== profile.username && (
                <FollowButtonWrapper>
                    <FollowButton
                        profileUsername={profile.username}
                        initiallyFollowing={initiallyFollowing ?? false}
                    />
                </FollowButtonWrapper>
            )}
            {!editing ?
                (<p>{profile.bio}</p>) :
                (<input className={"bioInput"} value={bio} aria-label={"bio"} onChange={(e) => (setBio(String(e.target.value)))}/>)}
            {currentUsername === profile.username ? (!editing ?
                (<button onClick={() => setEditing(true)}>edit profile</button>) :
                (<button onClick={sendProfileUpdate}>Update Profile Info</button>)) : <></>}
            {currentUsername === profile.username && (
                <Link href="/blog-post-creation-page" className="newPost">
                    New Post
                </Link>
            )}
        </UserInfoDiv>
    )
}