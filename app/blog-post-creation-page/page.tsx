'use client'

import { useState } from "react";
import styled from "styled-components";

const StyledMain = styled.main`
    width: 70%;
    padding: 2%;
    margin: auto;
    background-color: #d9d9d9;
    text-align: left;
    min-height: 100vh;
    font-size: calc(2px + 1.4vw);

    @media screen and (max-width: 1000px) {
        width: 100%;
    }
`;

const StyledTitle = styled.h1`
    font-size: calc(3px + 2.5vw);
    color: black;
    margin-bottom: 2%;
    text-align: center;
`;

const StyledCard = styled.form`
    background-color: #6f9291;
    padding: 3%;
`;

const StyledField = styled.div`
    margin-bottom: 3%;
`;

const StyledLabel = styled.label`
    display: block;
    font-size: calc(2px + 1.5vw);
    color: white;
    margin-bottom: 1%;
`;

const StyledInput = styled.input`
    width: 60%;
    height: 40px;
    border: none;
    background-color: #ececec;
    padding: 0 10px;
`;

const StyledUploadContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 3% 0;
`;

const StyledUploadButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 12px;
    border: none;
    background-color: #ececec;
    font-size: 28px;
    margin-right: 10px;
`;

const StyledUploadText = styled.span`
    color: white;
    font-size: calc(2px + 1.5vw);
`;

const StyledTextArea = styled.textarea`
    width: 90%;
    height: 300px;
    border: none;
    background-color: #ececec;
    padding: 10px;
    resize: none;
`;

const StyledSubmitButton = styled.button`
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    background-color: #ececec;
    font-size: 16px;
    cursor: pointer;
`;

const StyledMessage = styled.p`
    margin-top: 2%;
    color: white;
`;

export default function BlogPost() {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    tags: tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
                    description: description,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Post submitted successfully.");
                setTitle("");
                setTags("");
                setDescription("");
            } else {
                setMessage(data.error || "Failed to submit post.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong.");
        }

        setLoading(false);
    }

    return (
        <StyledMain>
            <StyledTitle>Blog Post Creation Page</StyledTitle>

            <StyledCard onSubmit={handleSubmit}>
                <StyledField>
                    <StyledLabel htmlFor="title">Blog Post Title</StyledLabel>
                    <StyledInput
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </StyledField>

                <StyledField>
                    <StyledLabel htmlFor="tags">Tags</StyledLabel>
                    <StyledInput
                        id="tags"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </StyledField>

                <StyledUploadContainer>
                    <StyledUploadButton type="button">+</StyledUploadButton>
                    <StyledUploadText>Attach an image</StyledUploadText>
                </StyledUploadContainer>

                <StyledField>
                    <StyledLabel htmlFor="description">Description</StyledLabel>
                    <StyledTextArea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </StyledField>

                <StyledSubmitButton type="submit">
                    {loading ? "Submitting..." : "Submit Post"}
                </StyledSubmitButton>

                {message && <StyledMessage>{message}</StyledMessage>}
            </StyledCard>
        </StyledMain>
    );
}