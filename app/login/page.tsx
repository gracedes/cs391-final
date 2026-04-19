"use client"

import {authClient} from "@/lib/auth-client";
import styled from "styled-components";
import {useEffect} from "react";

const StyledButton = styled.button`
    width: 10%;
    border: none;
    margin: 2%;
    padding: .5%;
    border-radius: 8px;
    background-color: #3a3a40;
    color: white;
    font-size: calc(2px + 1vw);
    cursor: pointer;

    &:hover {
        background-color: #232329;
    }
`;

const StyledH1 = styled.h1`
    color: white;
    margin: 1%;
    font-size: calc(2px + 2.5vw);
    
`

const StyledP = styled.p`
    color: white;
    margin: 1%;
    font-size: calc(2px + 1.5vw);
`

const StyledContainer = styled.div`
    width: 100%;
`;


const PageWrapper = styled.div`
    width: 80vw;
    height: 100vh;
    margin: 0 auto;
    align-items: center;
    background-color: #5A7D7C;
    padding: 2%;
    display: flex;              
    flex-direction: column;
    justify-content: center;
`;

export default function LoginPage(){
    async function handleSignIn(){
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/auth-routing",
        });
    }

    // Using document.title since this is a client component (metadata not supported),
    // so we google how else to implement the title
    useEffect(() => {
        document.title = "Revival | Login";
    }, []);

    return (
        <StyledContainer>
        <PageWrapper>
            <StyledH1>Access Denied</StyledH1>
            <StyledP>Please log in to view this page and see your following feed.</StyledP>

            <StyledButton
                onClick={handleSignIn}
            >
                Sign in with Google
            </StyledButton>
        </PageWrapper>
        </StyledContainer>
    );
}