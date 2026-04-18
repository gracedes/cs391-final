"use client"
import { useState } from "react";
import styled from "styled-components";
import makeBlogPost from "@/lib/makeBlogPost";

export default function NewPostForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [username, setUsername] = useState("");
    const [tagsInput, setTagsInput] = useState("");
    const [success, setSuccess] = useState(false);

    return (
        <PageWrapper>
            <FormSection>
            <PageTitle>Blog Post Creation</PageTitle>
            {success && <SuccessMessage>Post created successfully!</SuccessMessage>}

            <StyledForm
                onSubmit={(e) => {
                    e.preventDefault();

                    makeBlogPost(title, content, tags, username)
                        .then((p) => {
                            if (!p) return;

                            setSuccess(true);
                            setTitle("");
                            setContent("");
                            setTags([]);
                            setUsername("");
                            setTagsInput("");

                            setTimeout(() => setSuccess(false), 3000);
                        })
                        .catch((err) => console.error(err));
                }}
            >
                <StyledInput
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <StyledInput
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <StyledInput
                    type="text"
                    placeholder="Tags (space-separated)"
                    value={tagsInput}
                    onChange={(e) => {
                        const value = e.target.value;
                        setTagsInput(value);

                        setTags(
                            value
                                .split(" ")
                                .map((tag) => tag.trim())
                                .filter((tag) => tag !== "")
                        );
                    }}
                />

                <StyledTextarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <ButtonWrapper>
                    <StyledButton type="submit">Create</StyledButton>
                </ButtonWrapper>
            </StyledForm>
            </FormSection>
        </PageWrapper>
    );
}

const PageTitle = styled.h1`
    margin-top: 2%;
    margin-bottom: 2%;
    font-size: calc(2px + 2.2vw);
    color: white;
`;

const PageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: stretch;
    background-color: white;
`;

const FormSection = styled.div`
    width: 80%;
    height: 100%;
    background-color: #5A7D7C;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3% 0 4% 0;
`;

const StyledForm = styled.form`
    width: 60%;
    display: flex;
    flex-direction: column;
`;

const SuccessMessage = styled.h2`
    color: green;
    text-align: center;
    margin-bottom: 2%;
    font-size: calc(2px + 1.6vw);
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 2%;
    margin-bottom: 7%;
    border: 1px solid #ccc;
    outline: none;
    background-color: white;
    font-size: calc(2px + 1.4vw);
    border-radius: 8px;
    box-sizing: border-box;
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    height: 20%;
    padding: 2%;
    margin-bottom: 5%;
    border: 1px solid #ccc;
    outline: none;
    background-color: white;
    font-size: calc(2px + 1.4vw);
    border-radius: 8px;
    resize: vertical;
    box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.button`
    width: 15%;
    padding: 1.5% 2%;
    border: none;
    border-radius: 8px;
    background-color: darkgrey;
    color: white;
    font-size: calc(2px + 1.4vw);
    cursor: pointer;

    &:hover {
        background-color: grey;
    }
`;