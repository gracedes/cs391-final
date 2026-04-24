"use client"

import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";
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
        <DropdownMenuButton onClick={handleSignOut}>
            Sign Out
        </DropdownMenuButton>
    )
}