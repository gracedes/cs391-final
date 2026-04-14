"use client";

import {useParams} from "next/navigation";
import getProfile from "@/lib/getProfile";
import {UserProps} from "@/app/interfaces/UserProps";
import {useState} from "react";

export default function ProfilePage() {
    const params = useParams<{profile: string}>();
    const [user, setUser] = useState<UserProps>();

    getProfile(params.profile).then(u =>
        {setUser(u as UserProps)});

    if (!user) {
        return <div>User not found</div>;
    } else { return (
        <>
            <h1>{user.nickname}</h1>
            <h3>{user.username}</h3>
            <p>{user.bio}</p>
        </>
    )}
}