// Responsible: Elizabeth
// Purpose: This page controls access to the blog post creation form.
// It checks that the user is logged in and has completed username setup
// before allowing them to create a new blog post.


import NewPostForm from "@/app/components/NewPostForm";
import { Metadata } from "next";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

// Page metadata controls the browser tab title and SEO description.
// This is page-level information, so it belongs in the route file.
export const metadata: Metadata = {
    title: "Revival | Blog Post Creation",
    description: "Revival's Blog Post Creation page",
};

// BlogPostCreationPage is a server component because it checks authentication
// before rendering the form. This keeps protected logic on the server instead
// of exposing it in the browser.
export default async function BlogPostCreationPage(){
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // If there is no active session or user, the visitor should not be able
    // to access the post creation form, so we send them to the login page.
    if(!session || !session.user){
        redirect("/login")
    }
    // Users need a username before creating posts because the form
    // uses the username to associate the post with the author.
    const currentUser = session.user as any;
    if (!currentUser.username || currentUser.username.trim() === ""){
        redirect("/setup-username");
    }
    // Once the user is authenticated and has a username, render the post form.
    // Passing the username lets the form know who is creating the post.
    return (<NewPostForm username={currentUser.username}/>);
};

