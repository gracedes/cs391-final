"use server";

import getCollection from "@/lib/db";
import {UserProps} from "@/app/interfaces/UserProps";
import {useState} from "react";

export default async function getProfile(username:string):Promise<UserProps|null>{
    const [user, setUser] = useState<UserProps | null>(null);

    const userCollection = await getCollection("users");
    await userCollection.findOne({username})
        .then((user) =>
            {if (user) {
                setUser(user.toArray() as UserProps)
            }});

    if (!user) {
        console.error("No user found");
        return null
    }

    return {
        // TODO: update temp values later
        username: user.username,
        name: user.name,
        bio: (user.bio ? user.bio : "no bio"),
        image: user.image
        //following: null;
        //tags: null;
        //posts: PostProps[];
    };
}