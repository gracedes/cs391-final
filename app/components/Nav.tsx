"use client"

import styled from "styled-components";
import Link from "next/link";
import {authClient} from "@/lib/auth-client";
import ProfileDropdown from "@/app/components/ProfileDropdown";

// TODO: add new post button?

const NavBar = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #232C33;
    height: 10vh;
    width: 100vw;
    box-sizing: border-box;
    padding: 0 4vw;
    font-size: calc(14px + 0.75vw);
    .text-link {
        text-decoration: none;
        color: white;
        margin: 0 4vw;
    }
    .center-links {
        margin: 0 auto;
        width: fit-content;
    }
`;

export default function Nav() {
    const { data: session, isPending } = authClient.useSession();

    return (
        <NavBar>
            <div className="center-links">
                <Link className="text-link" href="/">Discover</Link>
                <Link className="text-link" href="/following">Following</Link>
                <Link className="text-link" href="/map">Map</Link>
            </div>
            <ProfileDropdown session={session} isPending={isPending} imageSize="8vh"/>
        </NavBar>
    );
};