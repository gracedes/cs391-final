/**
 * FOLLOWING PAGE (Server Component)
 * ───────────────────────────────────────────────────────────────────────
 * • Displays posts from users the current user follows.
 * • Supports sorting by newest/oldest and filtering by a single tag.
 * • Authentication is checked; missing username redirects to setup.
 *
 * Author: Edward Reyna
 */

import PostsDisplay from "@/app/components/PostDisplay";
import getFollowingPosts from "@/lib/getFollowingPosts";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import styled from "styled-components";

const SortBar = styled.div`
    display: flex;
    justify-content: flex-end;
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

export default async function FollowingPage({
                                                searchParams,
                                            }: {
    searchParams: Promise<{ sort?: string; tag?: string }>;
}) {
    // --- Authentication & user validation ---
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || !session.user) {
        redirect("/login");
    }

    const currentUser = session.user as any;
    if (!currentUser.username || currentUser.username.trim() === "") {
        redirect("/setup-username");
    }

    // --- Determine sorting order from the URL query string ---
    const params = await searchParams;
    const sortOrder = params.sort === "oldest" ? "oldest" : "newest";

    // Optional tag filter
    const tag = params.tag;

    // Fetch the posts that the current user follows, applying sort and tag filter.
    const followingPosts = await getFollowingPosts(sortOrder, tag);

    return (
        <PostsDisplay inputPosts={followingPosts} activeTag={tag}>
            <SortBar>
                <SortButton
                    href={`/following?sort=newest${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`}
                    $active={sortOrder === "newest"}
                >
                    Newest
                </SortButton>

                <SortButton
                    href={`/following?sort=oldest${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`}
                    $active={sortOrder === "oldest"}
                >
                    Oldest
                </SortButton>
            </SortBar>
        </PostsDisplay>
    );
}