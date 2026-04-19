import getPostById from "@/lib/getPostById";
import PostView from "@/app/components/PostView";
import {redirect} from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function FullPostPage({params}:{params:Promise<{id:string}>}){
    const {id}=await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const currentUserId = session?.user?.id;

    const post = await getPostById(id, currentUserId);

    if (!post) {
        redirect("/error");
    }

    return <PostView post={post} />;
}