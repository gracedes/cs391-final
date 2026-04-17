import PostsDisplay from "@/app/components/PostDisplay";
import getFollowingPosts from "@/lib/getFollowingPosts";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export default async function FollowingPage(){
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

    const followingPosts = await getFollowingPosts();


    return(
        <PostsDisplay inputPosts={followingPosts}/>
    );
}
