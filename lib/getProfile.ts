"use server";

import getCollection from "@/lib/db";
import {UserProps} from "@/app/interfaces/UserProps";

export default async function getProfile(username:string):Promise<UserProps|null>{
    // search for the provided username in the users collection
    const userCollection = await getCollection("user");
    const userProfile = await userCollection.findOne({username});

    if (!userProfile) {
        console.error("No users found");
        return null
    }

    // return only the fields used on the profile display
    return {
        username: userProfile.username,
        name: userProfile.name,
        bio: (userProfile.bio ? userProfile.bio : "no bio"),
        image: userProfile.image
    };
}