import PostsDisplay from "@/app/components/PostDisplay";
import getFollowingPosts from "@/lib/getFollowingPosts";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import styled from "styled-components";

const SortBar = styled.div`
    display: flex;
    gap: 1rem;
    margin: 1.5rem;
`;

const SortButton = styled(Link)<{ $active?: boolean }>`
    padding: 0.4rem 0.9rem;
    border-radius: 20px;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    background-color: ${({ $active }) => ($active ? "#D9D9D9" : "#5A7D7C")};
    color: ${({ $active }) => ($active ? "#000" : "#FFF")};

    &:hover {
        opacity: 0.8;
    }
`;

export const metadata: Metadata = {
    title: "Revival | Following",
    description: "Revival's Following page",
};

export default async function FollowingPage({searchParams,}: {
    searchParams: Promise<{ sort?: string }>;
}){
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session || !session.user){
        redirect("/login")
    }

    const currentUser = session.user as any;
    if (!currentUser.username || currentUser.username.trim() === ""){
        redirect("/setup-username");
    }

    const params = await searchParams;
    const sortOrder = params.sort === "oldest" ? "oldest" : "newest";

    const followingPosts = await getFollowingPosts(sortOrder);


    return(
        <>
            <SortBar>
                <SortButton
                    href="/?sort=newest"
                    $active={sortOrder === "newest"}
                >
                    Newest
                </SortButton>

                <SortButton
                    href="/?sort=oldest"
                    $active={sortOrder === "oldest"}
                >
                    Oldest
                </SortButton>
            </SortBar>

            <PostsDisplay inputPosts={followingPosts} />
        </>
    );
}
