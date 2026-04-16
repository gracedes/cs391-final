"use client"

import {authClient} from "@/lib/auth-client";

export default function LoginPage(){
    async function handleSignIn(){
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/auth-routing",
        });
    }

    return (
        <div>
            <h1>Access Denied</h1>
            <p>Please log in to view this page and see your following feed.</p>

            <button
                onClick={handleSignIn}
            >
                Sign in with Google
            </button>
        </div>
    );
}