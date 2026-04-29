"use client";

// Responsible: Elizabeth
// Purpose: This component displays the blog post creation form.
// It lets a logged-in user create a post with a title, tags, content,
// and an optional map location pin.

import { useState } from "react";
import styled from "styled-components";
import makeBlogPost from "@/lib/makeBlogPost";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// Responsible: Elizabeth
// This map style uses OpenStreetMap raster tiles.
// Keeping the style object outside the component prevents it from being
// recreated every time the form re-renders.
const osmStyle = {
    version: 8 as const,
    sources: {
        "osm-tiles": {
            type: "raster" as const,
            tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap contributors",
        },
    },
    layers: [
        {
            id: "osm-layer",
            type: "raster" as const,
            source: "osm-tiles",
            minzoom: 0,
            maxzoom: 19,
        },
    ],
};

// Responsible: Elizabeth
// NewPostForm handles the post creation UI and form state.
// The username is passed in from the protected page so the post can be
// connected to the currently logged-in user.
export default function NewPostForm({ username }: { username: string }) {
    // Stores the post title typed by the user.
    const [title, setTitle] = useState("");

    // Stores the main body/content of the post.
    const [content, setContent] = useState("");

    // Stores tags as a Set so duplicate tags are automatically removed.
    const [tags, setTags] = useState<Set<string>>(new Set());

    // Stores the raw tag input string shown in the input box.
    const [tagsInput, setTagsInput] = useState("");

    // Controls whether the success message appears after post creation.
    const [success, setSuccess] = useState(false);

    // Controls whether the optional map section is shown.
    const [showMap, setShowMap] = useState(false);

    // Stores the selected longitude and latitude after the user clicks the map.
    // It starts as null because the user may choose not to add a location.
    const [markerPos, setMarkerPos] = useState<{ lng: number; lat: number } | null>(null);

    // When the user clicks the map, save that point as the post's location.
    const handleMapClick = (e: any) => {
        setMarkerPos({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    };

    return (
        <PageWrapper>
            <FormSection>
                <PageTitle>Blog Post Creation</PageTitle>

                {/* Only show this message after a post has been successfully created. */}
                {success && <SuccessMessage>Post created successfully!</SuccessMessage>}

                <StyledForm
                    onSubmit={(e) => {
                        // Prevents the browser from refreshing the page on submit.
                        e.preventDefault();

                        // Sends the post data to the helper function that creates the blog post.
                        // If the map is turned off, longitude and latitude are sent as null.
                        makeBlogPost(
                            title,
                            content,
                            Array.from(tags),
                            username,
                            showMap ? markerPos?.lng : null,
                            showMap ? markerPos?.lat : null
                        )
                            .then((p) => {
                                // If the post was not created, stop here.
                                if (!p) return;

                                // Show a temporary success message.
                                setSuccess(true);

                                // Clear the form after a successful submission.
                                setTitle("");
                                setContent("");
                                setTags(new Set());
                                setTagsInput("");
                                setMarkerPos(null);
                                setShowMap(false);

                                // Hide the success message after 3 seconds.
                                setTimeout(() => setSuccess(false), 3000);
                            })
                            // Logs errors so debugging is easier if post creation fails.
                            .catch((err) => console.error(err));
                    }}
                >
                    <StyledInput
                        type="text"
                        placeholder="Title"
                        value={title}
                        // Updates title state whenever the user types.
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <StyledInput
                        type="text"
                        placeholder="Tags (space-separated)"
                        value={tagsInput}
                        onChange={(e) => {
                            const value = e.target.value;

                            // Keep the input text controlled by React state.
                            setTagsInput(value);

                            // Split tags by spaces, remove extra whitespace,
                            // and ignore empty values.
                            const tagArray = value
                                .split(" ")
                                .map((tag) => tag.trim())
                                .filter((tag) => tag !== "");

                            // Store tags in a Set to avoid duplicate tags.
                            setTags(new Set(tagArray));
                        }}
                    />

                    <StyledTextarea
                        placeholder="Content"
                        value={content}
                        // Updates content state whenever the user types.
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <MapToggleWrapper>
                        <label style={{ color: "white", fontSize: "1.2rem", marginBottom: "10px" }}>
                            <input
                                type="checkbox"
                                checked={showMap}
                                // Shows or hides the map based on whether the user wants a location.
                                onChange={(e) => setShowMap(e.target.checked)}
                                style={{ marginRight: "10px" }}
                            />
                            Add a location to this post?
                        </label>
                    </MapToggleWrapper>

                    {/* The map only appears when the user chooses to add a location. */}
                    {showMap && (
                        <MapContainer>
                            <p style={{ color: "white", textAlign: "center", marginBottom: "10px" }}>
                                Click on the map to drop a pin.
                            </p>

                            <MapWrapper>
                                <Map
                                    // Starts the map around Boston/Boston University.
                                    initialViewState={{
                                        longitude: -71.1054,
                                        latitude: 42.3505,
                                        zoom: 12,
                                    }}
                                    mapStyle={osmStyle}
                                    onClick={handleMapClick}
                                    cursor="pointer"
                                >
                                    {/* Only render the marker after the user has clicked the map. */}
                                    {markerPos && (
                                        <Marker
                                            longitude={markerPos.lng}
                                            latitude={markerPos.lat}
                                            color="red"
                                        />
                                    )}
                                </Map>
                            </MapWrapper>
                        </MapContainer>
                    )}

                    <ButtonWrapper>
                        <StyledButton type="submit">Create</StyledButton>
                    </ButtonWrapper>
                </StyledForm>
            </FormSection>
        </PageWrapper>
    );
}

// Responsible: Elizabeth
// Styled components below control the layout and appearance of this form.

const PageTitle = styled.h1`
    margin-top: 2%;
    margin-bottom: 2%;
    font-size: calc(2px + 2.2vw);
    color: white;
`;

const PageWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: stretch;
    background-color: white;
`;

const FormSection = styled.div`
    width: 80%;
    min-height: 100%;
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
    color: #155724;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    width: 60%;
    padding: 1.5% 2%;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 3%;
    font-size: calc(2px + 1.4vw);
    box-sizing: border-box;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    background-color: #3a3a40;
    color: white;
    font-size: calc(2px + 1.4vw);
    cursor: pointer;

    &:hover {
        background-color: #333238;
    }
`;

const MapToggleWrapper = styled.div`
    width: 100%;
    margin-bottom: 3%;
    display: flex;
    justify-content: flex-start;
`;

const MapContainer = styled.div`
    width: 100%;
    margin-bottom: 5%;
    display: flex;
    flex-direction: column;
`;

const MapWrapper = styled.div`
    height: 300px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #ccc;
`;