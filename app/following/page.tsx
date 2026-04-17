import PostsDisplay from "@/app/components/PostDisplay";
import getFollowingPosts from "@/lib/getFollowingPosts";

export default async function FollowingPage(){
    const followingPosts = await getFollowingPosts("edward");


    return(
        <PostsDisplay inputPosts={followingPosts}/>
    );
}
