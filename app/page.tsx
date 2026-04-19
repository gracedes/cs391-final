import getAllPosts from "@/lib/getAllPosts";
import PostsDisplay from "@/app/components/PostDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Revival | Discover",
    description: "Revival's Discover page",
};

export default async function Home() {

    const posts = await getAllPosts();

    return (
      <>
          <PostsDisplay inputPosts={posts}/>
      </>
  );
}
