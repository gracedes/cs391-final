"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";
import {isUsernameAvailable} from "@/lib/checkUsername";
import styled from "styled-components";
import { useEffect } from "react";


const StyledH1 = styled.h1`
    color: white;
    margin: 2%;
    font-size: calc(2px + 2.5vw);
`
const StyledLabel = styled.label`
    color: white;
    font-size: calc(2px + 1.5vw);
`

const StyledP = styled.p`
    color: white;
    margin: 2%;
    font-size: calc(2px + 1.5vw);
`

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


export default function SetupUsernamePage() {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Using document.title since this is a client component (metadata not supported),
    // so we google how else to implement the title
    useEffect(() => {
        document.title = "Revival | Setup Username";
    }, []);

    const router = useRouter();
    const handleAction = async (formData: FormData)=> {
        setError("");
        setIsSubmitting(true);

        const rawUsername = formData.get("username");
        if(!rawUsername || typeof rawUsername !== "string"){
            setError("Username cannot contain spaces.");
            setIsSubmitting(false);
            return;
        }

        const cleanUsername = rawUsername.toLowerCase().trim();

        if (cleanUsername.includes(" ")){
            setError("Username cannot contain spaces.");
            setIsSubmitting(false);
            return;
        }

        const available = await isUsernameAvailable(cleanUsername);

        if(!available){
            setError("Sorry, that username is already taken. Please choose another.");
            setIsSubmitting(false);
            return;
        }

        const { error: updateError } = await authClient.updateUser({
            username: cleanUsername,
        });

        if(updateError){
            setError(updateError.message || "Failed to update username. It might be taken.");
            setIsSubmitting(false);
        } else {
            router.push("/following");
        }
    };

    return (
        <PageWrapper>
            <StyledContainer>
                <StyledH1>Choose your Username</StyledH1>
                <StyledP>This is how other users will see you and follow your posts</StyledP>

                <form action={handleAction}>
                    <div>
                        <StyledLabel htmlFor="username">Username: </StyledLabel>
                        <StyledInput
                            id="username"
                            name="username"
                            type="text"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    {error && (
                        <div>
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                    <StyledButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save and Continue"}
                    </StyledButton>
                </form>
            </StyledContainer>
    </PageWrapper>
    );
}
