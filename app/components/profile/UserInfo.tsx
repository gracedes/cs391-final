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

// the div for the right panel of the user page,
// it uses a grid layout with font sizing and
// styling provided on a per-child basis
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
        height: fit-content;
        width: 100%;
        font-size: clamp(20px, 3vw, 40px);
        margin-bottom: 0.25vh;
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
    
    .bioInput {
        grid-column: 1;
        grid-row: 4;
        height: 40%;
        width: 100%;
        resize: none;
        font-size: clamp(12px, 1.5vw, 22px);
        margin-bottom: 1vh;
        padding-bottom: 1vh;
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

    // useEffect for fetching the profile data from mongodb
    useEffect(() => {
        getProfile(username).then((data) => {
            setProfile(data);
            setLoading(false);
            if (data) {
                // useState is used so that changes to the profile on user edit can be shown without refreshing the page
                setName(data.name);
                setBio(data.bio);
            }
        });
    }, [username]);

    // this function is called by the submit button when updating profile info
    const sendProfileUpdate = () => {
        if (profile) {
            updateProfile(profile.username, name, (bio !== undefined ? bio : ""));
        }
        setEditing(false);
    }

    // returned if getProfile() has not yet completed
    if (loading) return (<UserInfoDiv><p>Loading...</p></UserInfoDiv>);

    // returned if no profile is found
    if (!profile) {
        return (<UserInfoDiv><p>No profile found at that username :(</p></UserInfoDiv>);
    }

    // otherwise, return profile display
    return (
        <UserInfoDiv>
            <div className="pfp">
                <Image src={profile.image} fill={true} alt={"users's profile picture"}/>
            </div>
            {/* only show input dield when editing, otherwise show name */}
            {!editing ?
                (<h1>{name}</h1>) :
                (<input className={"nameInput"} value={name} aria-label={"name"} onChange={(e) => (setName(String(e.target.value)))}/>)}
            <h3>{"@" + profile.username}</h3>
            {/* show the follow button if the profile being viewed differs from the currently signed in user */}
            {currentUsername && currentUsername !== profile.username && (
                <FollowButtonWrapper>
                    <FollowButton
                        profileUsername={profile.username}
                        initiallyFollowing={initiallyFollowing ?? false}
                    />
                </FollowButtonWrapper>
            )}
            {/* only show input field when editing, otherwise show bio */}
            {!editing ?
                (<p>{bio}</p>) :
                (<textarea className={"bioInput"} value={bio} aria-label={"bio"} onChange={(e) => (setBio(String(e.target.value)))}/>)}
            {/* show edit profile/submit changes button when viewing own profile */}
            {currentUsername === profile.username ? (!editing ?
                (<button onClick={() => setEditing(true)} className={"newPost"}>Edit Profile</button>) :
                (<button onClick={sendProfileUpdate} className={"newPost"}>Submit Changes</button>)) : <></>}
            {/* show new post button if viewing own profile */}
            {currentUsername === profile.username && (
                <Link href="/blog-post-creation-page" className="newPost">
                    New Post
                </Link>
            )}
        </UserInfoDiv>
    )
}