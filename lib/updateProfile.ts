"use server";

import getCollection from "@/lib/db";

export default async function updateProfile(username: string, name: string, bio: string):Promise<void> {
    const userCollection = await getCollection("user");
    const userProfile = await userCollection.findOne({username});

    if (!userProfile) {
        return;
    }

    const result = await userCollection.updateOne(
        { username: username },
        {
            $set: {
                name: name,
                bio: bio,
            },
        }
    );

    console.log("profile update result:", result);
}