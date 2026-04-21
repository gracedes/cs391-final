"use client"

import styled, { css } from "styled-components";
import Link from "next/link";
import {authClient} from "@/lib/auth-client";
import ProfileDropdown from "@/app/components/ProfileDropdown";
import {usePathname} from "next/navigation";

// TODO: add new post button?

const NavBar = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background-color: #232C33;
    height: 10vh;
    width: 100vw;
    box-sizing: border-box;
    padding: 0 4vw;
    font-size: calc(14px + 0.75vw);
`;

const LinksDiv = styled.div`
    display: flex;
    margin: 0 auto;
    width: 50vw;
    justify-content: space-evenly;
`;

const StyledLinks = styled(Link)`
    color: white;
    text-decoration: none;
    margin-left: 2vw;
    font-size: calc(2px + 2.3vw);
    text-align: center;
    padding: 0 1vw;
    width: fit-content;
`;

const DiscoverLink = styled(StyledLinks)<{ $page: string }>`
    ${props => props.$page === '/' && css`
        background-color: white;
        color: black;
        border-radius: 40vw;
    `}
`;

const FollowingLink = styled(StyledLinks)<{ $page: string }>`
    ${props => props.$page === '/following' && css`
        background-color: white;
        color: black;
        border-radius: 40vw;
    `}
`;

const MapLink = styled(StyledLinks)<{ $page: string }>`
    ${props => props.$page === '/map' && css`
        background-color: white;
        color: black;
        border-radius: 40vw;
    `}
`;

const Wordmark = styled(Link)`
    font-family: "Syncopate", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: calc(13px + 2vw);
    width: 8vh;
    color: white;
    text-decoration: none;
`;

export default function Nav() {
    const { data: session, isPending } = authClient.useSession();

    const pathname = usePathname()

    return (
        <NavBar>
            <Wordmark href="/">Revival</Wordmark>
            <LinksDiv>
                <DiscoverLink href="/" $page={pathname}>Discover</DiscoverLink>
                <FollowingLink href="/following" $page={pathname}>Following</FollowingLink>
                <MapLink href="/map" $page={pathname}>Map</MapLink>
            </LinksDiv>
            <ProfileDropdown session={session} isPending={isPending} imageSize="7vh"/>
        </NavBar>
    );
};