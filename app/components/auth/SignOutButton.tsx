"use client"

import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";

export default function SignOutButton() {
    const router = useRouter();

    async function handleSignOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                },
            },
        });
    }

    return (
        <button onClick={handleSignOut}>
            Sign Out
        </button>
    )
}