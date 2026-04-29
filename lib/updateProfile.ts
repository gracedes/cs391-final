"use server";

import getCollection from "@/lib/db";

export default async function updateProfile(username: string, name: string, bio: string):Promise<void> {
    const userCollection = await getCollection("user");
    const userProfile = await userCollection.findOne({username});

    if (!userProfile) {
        return;
    }

    // use updateOne to update profile name and bio with inputted values
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