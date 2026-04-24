"use client";

import {useEffect, useState} from "react";
import {PostProps} from "@/app/interfaces/PostProps";
import getProfilePosts from "@/lib/getProfilePosts";
import PostsDisplay from "@/app/components/profile/ProfilePostDisplay";

export default function UserPosts({ username }: { username: string }) {
    const [posts, setPosts] = useState<PostProps[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfilePosts(username).then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, [username]);

    if (loading) return (<p>Loading...</p>);

    if (!posts) {
        return (<p>User has not made any posts yet!</p>);
    }

    return (<PostsDisplay inputPosts={posts} />);
}