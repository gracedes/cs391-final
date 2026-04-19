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
    const signIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/auth-routing",
        });
    };

    return <DropdownMenuButton onClick={signIn}>Sign in with Google</DropdownMenuButton>;
}