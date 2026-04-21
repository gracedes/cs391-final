"use client";

import getProfile from "@/lib/getProfile";
import {useEffect, useState} from "react";
import {UserProps} from "@/app/interfaces/UserProps";
import Image from "next/image";
import styled from "styled-components";

const UserInfoDiv = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: calc(min(600px, 35vw) - 2 * max(2vh, 2vw)) fit-content(3vh) fit-content(2vh) fit-content(5vh);
    background-color: #5A7D7C;
    padding: max(2vh, 2vw) max(2vh, 2vw);
    grid-row-gap: 0.5vh;
    color: white;
    
    .pfp {
        grid-column: 1/3;
        grid-row: 1;
        position: relative;
    }
    
    h1 {
        grid-column: 1;
        grid-row: 2;
    }
    
    h3 {
        grid-column: 1;
        grid-row: 3;
        padding-bottom: 0.75vh;
        font-style: italic;
    }
    
    p {
        grid-column: 1/3;
        grid-row: 4;
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
            <h3>{profile.username}</h3>
            <p>bio goes here this is the bio biography yeah yeah bio yeah this is a bio omg so cool is that a bio yes it is!</p>
        </UserInfoDiv>
    )
}