
import UserInfo from "@/app/components/profile/UserInfo";
import UserPosts from "@/app/components/profile/UserPosts"
import styled from "styled-components";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ProfilePageDiv = styled.div`
    width: 100vw;
    height: 90vh;
    
    display: grid;
    grid-template-columns: auto min(600px, 35vw);
`

export default async function ProfilePage({
                                              params,
                                          }: {
    params: Promise<{ profile: string }>;
}) {
    const { profile } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const currentUser = session?.user as any;

    return (
        <ProfilePageDiv>
            <UserPosts username={profile} />
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