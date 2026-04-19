"use server";

import getProfile from "@/lib/getProfile";

export default async function UserInfo(username:string) {
    const profile = await getProfile(username);

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