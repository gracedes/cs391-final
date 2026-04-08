import getAllPosts from "@/lib/getAllPosts";
import PostsDisplay from "@/app/components/PostDisplay";

export default async function Home() {

    const posts = await getAllPosts();

    return (
      <>
          <PostsDisplay inputPosts={posts}/>
      </>
  );
}
