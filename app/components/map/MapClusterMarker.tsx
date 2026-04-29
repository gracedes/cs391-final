/**
 * MapClusterMarker – Client Component
 * ───────────────────────────────────────────────────────────────────────
 * • Renders a single cluster marker on the map.
 * • Size of the circle scales with the number of points inside the cluster.
 * • Clicking the marker calls the `onZoom` callback to zoom into the cluster.
 *
 * Author: Edward Reyna
 */

'use client';
import { Marker } from 'react-map-gl/maplibre';
import { MapClusterMarkerProps } from "@/app/interfaces/MapClusterMarkerProps";
import styled from "styled-components";

const ClusterCircle = styled.div<{ $pointCount: number; $totalPoints: number }>`
    width: ${({ $pointCount, $totalPoints }) => 30 + ($pointCount / $totalPoints) * 20}px;
    height: ${({ $pointCount, $totalPoints }) => 30 + ($pointCount / $totalPoints) * 20}px;
    background-color: #3b82f6;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

export default function MapClusterMarker({ id, longitude, latitude, pointCount, totalPoints, onZoom }: MapClusterMarkerProps) {
    return (
        <Marker key={`cluster-${id}`} longitude={longitude} latitude={latitude} onClick={onZoom}>
            {/* The circle shows the number of posts in this cluster */}
            <ClusterCircle $pointCount={pointCount} $totalPoints={totalPoints}>
                {pointCount}
            </ClusterCircle>
        </Marker>
    );
}