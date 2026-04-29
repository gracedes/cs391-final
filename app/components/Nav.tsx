"use client"

import styled, { css } from "styled-components";
import Link from "next/link";
import {authClient} from "@/lib/auth-client";
import ProfileDropdown from "@/app/components/ProfileDropdown";
import {usePathname} from "next/navigation";
import getProfile from "@/lib/getProfile";
import {useEffect, useState} from "react";

// styling for the bar background itself
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

// this div holds the three center links, using auto margin to center them with space on either side
const LinksDiv = styled.div`
    display: flex;
    margin: 0 auto;
    width: 50vw;
    justify-content: space-evenly;
`;

// styling for the three center links
const StyledLinks = styled(Link)`
    color: white;
    text-decoration: none;
    margin-left: 2vw;
    font-size: calc(2px + 2.3vw);
    text-align: center;
    padding: 0 1vw;
    width: fit-content;
`;

// props are used to style the link for the current page
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

// the wordmark logo on the left side
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
    // the client session is used to update the profile picture displayed
    const { data: session, isPending } = authClient.useSession();
    // start off with default (signed-out) image
    const [profilePicture, setProfilePicture] = useState("/temp-pfp.png");
    // if a profile is signed in, set the image to their user image
    useEffect(() => {
        if (session) {
            getProfile(session.user.username).then((data) => {
                if (data) {
                    setProfilePicture(data.image);
                }
            });
        }}, [session]);

    // pathname is passed into each link as props
    const pathname = usePathname()

    return (
        <NavBar>
            {/* we opted to have the wordmark link back to the root page because of muscle memory */}
            <Wordmark href="/">Revival</Wordmark>
            <LinksDiv>
                <DiscoverLink href="/" $page={pathname}>Discover</DiscoverLink>
                <FollowingLink href="/following" $page={pathname}>Following</FollowingLink>
                <MapLink href="/map" $page={pathname}>Map</MapLink>
            </LinksDiv>
            <ProfileDropdown session={session} isPending={isPending} imageSrc={profilePicture} imageSize="7vh"/>
        </NavBar>
    );
};