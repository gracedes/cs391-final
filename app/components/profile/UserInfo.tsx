"use client";

import getProfile from "@/lib/getProfile";
import {useEffect, useState} from "react";
import {UserProps} from "@/app/interfaces/UserProps";
import styled from "styled-components";

const UserInfoDiv = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto 1fr;
    background-color: #5A7D7C;
    
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

    if (loading) return <p>Loading...</p>;

    if (!profile) {
        return (<p>No profile found at that username :(</p>)
    }

    return (
        <UserInfoDiv>
            <h1>{profile.name}</h1>
            <h3>{profile.username}</h3>
            <p>{profile.image}</p>
        </UserInfoDiv>
    )
}