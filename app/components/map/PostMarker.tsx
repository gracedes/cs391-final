'use client';
import { Marker } from 'react-map-gl/maplibre';
import {PostMarkerProps} from "@/app/interfaces/PostMarkerProps";
import styled from "styled-components";

const PinMarker = styled.div`
  background-color: #ef4444;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  cursor: pointer;
`;

export default function PostMarker({ postId, longitude, latitude, onClick }: PostMarkerProps) {
    return (
        <Marker
            key={`post-${postId}`}
            longitude={longitude}
            latitude={latitude}
            onClick={(e) => {
                e.originalEvent.stopPropagation();
                onClick();
            }}
        >
            <PinMarker />
        </Marker>
    );
}