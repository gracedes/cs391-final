"use client";

import getProfile from "@/lib/getProfile";
import {useEffect, useState} from "react";
import {UserProps} from "@/app/interfaces/UserProps";

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
        <div>
            <h1>{profile.name}</h1>
            <h3>{profile.username}</h3>
            <p>{profile.image}</p>
        </div>
    )
}