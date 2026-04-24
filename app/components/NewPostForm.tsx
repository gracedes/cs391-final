"use client"
import { useState } from "react";
import styled from "styled-components";
import makeBlogPost from "@/lib/makeBlogPost";
import Map, {Marker} from "react-map-gl/maplibre";
import 'maplibre-gl/dist/maplibre-gl.css';

const osmStyle = {
    version: 8 as const,
    sources: {
        'osm-tiles': {
            type: 'raster' as const,
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap contributors'
        }
    },
    layers: [{ id: 'osm-layer', type: 'raster' as const, source: 'osm-tiles', minzoom: 0, maxzoom: 19 }]
};

export default function NewPostForm({ username }: { username: string}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<Set<string>>(new Set());
    const [tagsInput, setTagsInput] = useState("");
    const [success, setSuccess] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [markerPos, setMarkerPos] = useState<{lng: number, lat: number} | null>(null);

    const handleMapClick = (e: any) => {
        setMarkerPos({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    };

    return (
        <PageWrapper>
            <FormSection>
            <PageTitle>Blog Post Creation</PageTitle>
            {success && <SuccessMessage>Post created successfully!</SuccessMessage>}

            <StyledForm
                onSubmit={(e) => {
                    e.preventDefault();

                    makeBlogPost(
                        title,
                        content,
                        Array.from(tags),
                        username,
                        showMap ? markerPos?.lng : null,
                        showMap ? markerPos?.lat : null
                    )
                        .then((p) => {
                            if (!p) return;

                            setSuccess(true);
                            setTitle("");
                            setContent("");
                            setTags(new Set());
                            setTagsInput("");
                            setMarkerPos(null);
                            setShowMap(false);

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
                    placeholder="Tags (space-separated)"
                    value={tagsInput}
                    onChange={(e) => {
                        const value = e.target.value;
                        setTagsInput(value);

                        const tagArray = value
                            .split(" ")
                            .map((tag) => tag.trim())
                            .filter((tag) => tag !== "");

                        setTags(new Set(tagArray));
                    }}
                />

                <StyledTextarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <MapToggleWrapper>
                    <label style={{ color: 'white', fontSize: '1.2rem', marginBottom: '10px' }}>
                        <input
                            type="checkbox"
                            checked={showMap}
                            onChange={(e) => setShowMap(e.target.checked)}
                            style={{ marginRight: '10px' }}
                        />
                        Add a location to this post?
                    </label>
                </MapToggleWrapper>

                {showMap && (
                    <MapContainer>
                        <p style={{ color: 'white', textAlign: 'center', marginBottom: '10px' }}>Click on the map to drop a pin.</p>
                        <MapWrapper>
                            <Map
                                initialViewState={{ longitude: -71.1054, latitude: 42.3505, zoom: 12 }}
                                mapStyle={osmStyle}
                                onClick={handleMapClick}
                                cursor="pointer"
                            >
                                {markerPos && (
                                    <Marker longitude={markerPos.lng} latitude={markerPos.lat} color="red" />
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