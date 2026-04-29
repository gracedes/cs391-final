"use client";

// Responsible: Elizabeth
// Purpose: This page lets a newly signed-in user create a username.
// It checks that the username is valid and available before saving it
// to the user's account.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { isUsernameAvailable } from "@/lib/checkUsername";
import styled from "styled-components";

// Responsible: Elizabeth
// Styled components below control the page layout and form appearance.

const StyledH1 = styled.h1`
    color: white;
    margin: 2%;
    font-size: calc(2px + 2.5vw);
`;

const StyledLabel = styled.label`
    color: white;
    font-size: calc(2px + 1.5vw);
`;

const StyledP = styled.p`
    color: white;
    margin: 2%;
    font-size: calc(2px + 1.5vw);
`;

const StyledInput = styled.input`
    width: 40%;
    padding: .5%;
    margin-bottom: 2%;
    border: 1px solid #ccc;
    outline: none;
    background-color: white;
    font-size: calc(2px + 1.4vw);
    border-radius: 8px;
    box-sizing: border-box;
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
    text-align: center;
`;

const StyledButton = styled.button`
    width: 15%;
    padding: 1%;
    margin: 2%;
    border: none;
    border-radius: 8px;
    background-color: #3a3a40;
    color: white;
    font-size: calc(2px + 1.4vw);
    cursor: pointer;

    &:hover {
        background-color: #232329;
    }
`;

const StyledContainer = styled.div`
    width: 100%;
`;

// Responsible: Elizabeth
// SetupUsernamePage handles username creation after login.
// This is a client component because it uses state, router navigation,
// and the client auth helper.
export default function SetupUsernamePage() {
    // Stores the current error message shown to the user.
    const [error, setError] = useState("");

    // Tracks whether the form is currently saving.
    // This prevents repeated submissions while the username is being checked.
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Since this is a client component, Next.js metadata cannot be used here.
    // We manually set the browser tab title when the component loads.
    useEffect(() => {
        document.title = "Revival | Setup Username";
    }, []);

    // Router is used to send the user to the following page after setup.
    const router = useRouter();

    // Handles the form submission and validates the username before saving.
    const handleAction = async (formData: FormData) => {
        // Clear old errors when the user tries to submit again.
        setError("");

        // Disable the form while validation and saving are happening.
        setIsSubmitting(true);

        // Read the username value from the submitted form.
        const rawUsername = formData.get("username");

        // Make sure the submitted username exists and is a string.
        if (!rawUsername || typeof rawUsername !== "string") {
            setError("Username cannot contain spaces.");
            setIsSubmitting(false);
            return;
        }

        // Normalize the username so capitalization and outside spaces
        // do not create separate versions of the same username.
        const cleanUsername = rawUsername.toLowerCase().trim();

        // Usernames cannot contain spaces because they are used as unique identifiers.
        if (cleanUsername.includes(" ")) {
            setError("Username cannot contain spaces.");
            setIsSubmitting(false);
            return;
        }

        // Check the database/helper function to make sure no one else has this username.
        const available = await isUsernameAvailable(cleanUsername);

        // Stop the submission if the username is already taken.
        if (!available) {
            setError("Sorry, that username is already taken. Please choose another.");
            setIsSubmitting(false);
            return;
        }

        // Save the cleaned username to the authenticated user's account.
        const { error: updateError } = await authClient.updateUser({
            username: cleanUsername,
        });

        // If saving fails, show the user an error and allow them to try again.
        if (updateError) {
            setError(updateError.message || "Failed to update username. It might be taken.");
            setIsSubmitting(false);
        } else {
            // If saving succeeds, send the user to their following feed.
            router.push("/following");
        }
    };

    return (
        <PageWrapper>
            <StyledContainer>
                <StyledH1>Choose your Username</StyledH1>

                <StyledP>
                    This is how other users will see you and follow your posts
                </StyledP>

                <form action={handleAction}>
                    <div>
                        <StyledLabel htmlFor="username">Username: </StyledLabel>

                        <StyledInput
                            id="username"
                            name="username"
                            type="text"
                            required
                            // Disable the input while submitting to avoid duplicate changes.
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Only show the error message when there is an error. */}
                    {error && (
                        <div>
                            <strong>Error:</strong> {error}
                        </div>
                    )}

                    <StyledButton type="submit" disabled={isSubmitting}>
                        {/* Change the button text while the form is saving. */}
                        {isSubmitting ? "Saving..." : "Save and Continue"}
                    </StyledButton>
                </form>
            </StyledContainer>
        </PageWrapper>
    );
}