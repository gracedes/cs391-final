
import UserInfo from "@/app/components/profile/UserInfo";
import UserPosts from "@/app/components/profile/UserPosts"
import styled from "styled-components";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {Metadata} from "next";

const ProfilePageDiv = styled.div`
    width: 100vw;
    height: 90vh;
    
    display: grid;

    grid-template-columns: 1fr min(450px, 23vw);
    gap: 0;
    background-color: #232C33;
`

export async function generateMetadata({params,}: {
    params: Promise<{ profile: string }>;
}): Promise<Metadata> {
    const { profile } = await params;

    // The profile page being viewed
    return {
        title: `Revival | ${profile}'s Profile`,
        description: `${profile}'s Profile Page`,
    };
}

export default async function ProfilePage({
                                              params,
                                          }: {
    params: Promise<{ profile: string }>;
}) {
    // get the username of the profile to display
    const { profile } = await params;
    // get the session headers from the auth api
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    // current user if session exists
    const currentUser = session?.user as any;

    return (
        <ProfilePageDiv>
            <UserPosts username={profile} />
            {/* pass not only the user to display, but also the currently logged-in user
                and if they  are following the user to display */}
            <UserInfo
                username={profile}
                currentUsername={currentUser?.username}
                initiallyFollowing={
                    currentUser?.following?.includes(profile) ?? false
                }
            />
        </ProfilePageDiv>
    );
}