import NewPostForm from "@/app/components/NewPostForm";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export default async function BlogPostCreationPage(){
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

    return (<NewPostForm username={currentUser.username}/>);
};

