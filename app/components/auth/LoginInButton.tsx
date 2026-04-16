"use client";
import { authClient } from "@/lib/auth-client";

export default function LoginButton() {
    const signIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/auth-routing",
        });
    };

    return <button onClick={signIn}>Sign in with Google</button>;
}