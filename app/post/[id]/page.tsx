import getPostById from "@/lib/getPostById";
import PostView from "@/app/components/PostView";
import {redirect} from "next/navigation";


export default async function FullPostPage({params}:{params:Promise<{id:string}>}){
    const {id}=await params;

    try{
        const post=await getPostById(id);
        if(post===null){
            return redirect(`/error`);
        }
        return <PostView post={post}/>
    }catch(err) {
        console.log("this"+err);
        return redirect(`/error`);
    }

}