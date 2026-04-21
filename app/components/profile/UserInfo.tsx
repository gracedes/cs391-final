"use client";

import getProfile from "@/lib/getProfile";
import {useEffect, useState} from "react";
import {UserProps} from "@/app/interfaces/UserProps";
import Image from "next/image";
import styled from "styled-components";

const UserInfoDiv = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: min(600px, 35vw) 1fr 1fr 1fr;
    background-color: #5A7D7C;
    
    .pfp {
        grid-column: 1/2;
        grid-row: 1;
        height: min(600px, 35vw);
        width: min(600px, 35vw);
        position: relative;
    }
    
    h1 {
        grid-column: 1;
        grid-row: 2;
    }
    
    h3 {
        grid-column: 1;
        grid-row: 3;
    }
    
    p {
        grid-column: 1/2;
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
            <p>bio</p>
        </UserInfoDiv>
    )
}