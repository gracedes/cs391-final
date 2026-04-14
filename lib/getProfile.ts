"use server";

import getCollection from "@/lib/db";
import {UserProps} from "@/app/interfaces/UserProps";

export default async function getProfile(username:string):Promise<UserProps|null>{
    const userCollection = await getCollection("users");
    const user = await userCollection.findOne({username});

    if (!user) {
        console.error("No user found");
        return null
    }

    return {
        // TODO: update temp values later
        username: user.username,
        nickname: user.username,
        bio: (user.bio ? user.bio : "no bio"),
        pfp: "/temp-pfp.jpg"
        //following: null;
        //tags: null;
        //posts: PostProps[];
    };
}