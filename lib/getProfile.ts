"use server";

import getCollection from "@/lib/db";
import {UserProps} from "@/app/interfaces/UserProps";

export default async function getProfile(username:string):Promise<UserProps|null>{

    const userCollection = await getCollection("user");
    const userProfile = await userCollection.findOne({username});

    if (!userProfile) {
        console.error("No users found");
        return null
    }

    return {
        // TODO: update temp values later
        username: userProfile.username,
        name: userProfile.name,
        bio: (userProfile.bio ? userProfile.bio : "no bio"),
        image: userProfile.image
        //following: null;
        //tags: null;
        //posts: PostProps[];
    };
}