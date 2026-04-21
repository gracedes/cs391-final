import getAllPosts from "@/lib/getAllPosts";
import PostsDisplay from "@/app/components/PostDisplay";
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
    title: "Revival | Discover",
    description: "Revival's Discover page",
};

export default async function Home({searchParams,}: { searchParams: Promise<{ sort?: string; tag?: string }>;
}) {
    const params = await searchParams;
    const sortOrder = params.sort === "oldest" ? "oldest" : "newest";
    const tag = params.tag;

    const posts = await getAllPosts(sortOrder, tag);

    return (
        <PostsDisplay inputPosts={posts} activeTag={tag}>
            <SortBar>
                <SortButton
                    href={`/?sort=newest${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`}
                    $active={sortOrder === "newest"}
                >
                    Newest
                </SortButton>

                <SortButton
                    href={`/?sort=oldest${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`}
                    $active={sortOrder === "oldest"}
                >
                    Oldest
                </SortButton>
            </SortBar>
        </PostsDisplay>
    );
}