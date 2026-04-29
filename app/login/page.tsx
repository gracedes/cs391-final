"use client";

// Responsible: Elizabeth
// Purpose: This page prompts unauthenticated users to sign in using Google.
// It restricts access to protected content (like feeds) and redirects users
// into the authentication flow.

import { authClient } from "@/lib/auth-client";
import styled from "styled-components";
import { useEffect } from "react";

// Responsible: Elizabeth
// Styled button for triggering Google sign-in.
// Uses hover styling to improve UX feedback.
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

// Responsible: Elizabeth
// Main heading for the page to clearly indicate access restriction.
const StyledH1 = styled.h1`
    color: white;
    margin: 1%;
    font-size: calc(2px + 2.5vw);
`;

// Responsible: Elizabeth
// Supporting text explaining why the user needs to log in.
const StyledP = styled.p`
    color: white;
    margin: 1%;
    font-size: calc(2px + 1.5vw);
`;

// Responsible: Elizabeth
// Outer container to span full width of the page.
const StyledContainer = styled.div`
    width: 100%;
`;

// Responsible: Elizabeth
// Centers the login UI vertically and horizontally.
// Uses flexbox for layout and consistent spacing.
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

// Responsible: Elizabeth
// LoginPage handles authentication entry for users who are not signed in.
// This is a client component because it uses hooks and triggers a client-side auth flow.
export default function LoginPage() {

    // Initiates Google OAuth sign-in using the auth client.
    // After successful login, the user is redirected to /auth-routing.
    async function handleSignIn() {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/auth-routing",
        });
    }

    // Responsible: Elizabeth
    // Since this is a client component, we cannot use Next.js metadata.
    // Instead, we manually set the browser tab title using document.title.
    useEffect(() => {
        document.title = "Revival | Login";
    }, []);

    return (
        <StyledContainer>
            <PageWrapper>
                {/* Main message indicating restricted access */}
                <StyledH1>Access Denied</StyledH1>

                {/* Explanation for why login is required */}
                <StyledP>
                    Please log in to view this page and see your following feed.
                </StyledP>

                {/* Button triggers Google authentication flow */}
                <StyledButton onClick={handleSignIn}>
                    Sign in with Google
                </StyledButton>
            </PageWrapper>
        </StyledContainer>
    );
}