export interface MapClusterMarkerProps {
    id: number;
    longitude: number;
    latitude: number;
    pointCount: number;
    totalPoints: number;
    onZoom: () => void;
}