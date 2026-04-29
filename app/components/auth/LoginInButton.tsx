/**
 * LoginButton – Client Component
 * ───────────────────────────────────────────────────────────────────────
 * • A button that triggers Google OAuth login via authClient.
 * • Redirects the user to /auth-routing after successful sign‑in.
 *
 * Author: Edward Reyna
 */

"use client";
import { authClient } from "@/lib/auth-client";
import styled from "styled-components";

const DropdownMenuButton = styled.button`
    background: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    width: 100%;
    font-family: inherit;
    text-align: left;
    color: inherit;
`;

export default function LoginButton() {
    // Sign in with Google, then let the server‑side auth‑routing page decide the next step.
    const signIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/auth-routing",  // post‑login routing page
        });
    };

    return <DropdownMenuButton onClick={signIn}>Sign in with Google</DropdownMenuButton>;
}