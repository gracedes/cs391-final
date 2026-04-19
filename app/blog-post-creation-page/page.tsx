import NewPostForm from "@/app/components/NewPostForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Revival | Blog Post Creation",
    description: "Revival's Blog Post Creation page",
};

export default async function BlogPostCreationPage(){
    return (<NewPostForm/>);
};

