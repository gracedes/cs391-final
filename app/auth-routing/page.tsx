import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export default async function AuthRouting() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session || !session.user){
        redirect("/");
    }
    const currentUser = session.user as any;
    if(!currentUser.username || currentUser.username.trim() === ""){
        redirect("/setup-username");
    } else {
        redirect("/following");
    }
}