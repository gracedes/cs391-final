'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Map from 'react-map-gl/maplibre';
import useSupercluster from 'use-supercluster';
import { StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { PostProps } from '@/app/interfaces/PostProps';
import PostMarker from './PostMarker';
import PostPopup from './PostPopup';
import MapClusterMarker from "@/app/components/MapClusterMarker";
import styled from "styled-components";

const MapWrapper = styled.div`
  height: 600px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
`;

const osmStyle: StyleSpecification = {
    version: 8,
    sources: {
        'osm-tiles': {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap contributors'
        }
    },
    layers: [{ id: 'osm-layer', type: 'raster', source: 'osm-tiles', minzoom: 0, maxzoom: 19 }]
};

export default function BlogMap({ posts }: { posts: PostProps[] }) {
    const mapRef = useRef<any>(null);
    const [zoom, setZoom] = useState(12);
    const [bounds, setBounds] = useState<[number, number, number, number] | undefined>(undefined);
    const [selectedPost, setSelectedPost] = useState<PostProps | null>(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { longitude, latitude } = position.coords;
                    if (mapRef.current) {
                        mapRef.current.getMap().flyTo({
                            center: [longitude, latitude],
                            zoom: 12,
                            speed: 1.5,
                            essential: true
                        });
                    }
                }
            );
        }
    }, []);

    const points = posts
        .filter(post => post.longitude !== undefined && post.latitude !== undefined)
        .map(post => ({
        type: 'Feature' as const,
        properties: { cluster: false, postId: post.id },
        geometry: { type: 'Point' as const, coordinates: [post.longitude, post.latitude] as [number, number] }
    }));

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 20 }
    });

    const updateMapState = useCallback(() => {
        if (mapRef.current) {
            const mapBounds = mapRef.current.getMap().getBounds();
            setBounds([
                mapBounds.getWest(), mapBounds.getSouth(),
                mapBounds.getEast(), mapBounds.getNorth()
            ]);
            setZoom(mapRef.current.getMap().getZoom());
        }
    }, []);

    const handleClusterZoom = (clusterId: number, longitude: number, latitude: number) => {
        if (!supercluster) return;
        const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(clusterId), 20);
        mapRef.current.getMap().flyTo({ center: [longitude, latitude], zoom: expansionZoom, speed: 1.5 });
    };

    return (
        <MapWrapper>
            <Map
                ref={mapRef}
                initialViewState={{ longitude: -71.1054, latitude: 42.3505, zoom: 14 }}
                mapStyle={osmStyle}
                onLoad={updateMapState}
                onMove={updateMapState}
            >
                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const isCluster = cluster.properties?.cluster;

                    if (isCluster) {
                        const clusterProps = cluster.properties as { cluster: boolean; point_count: number; cluster_id: number };
                        return (
                            <MapClusterMarker
                                key={`cluster-${cluster.id}`}
                                id={cluster.id as number}
                                longitude={longitude}
                                latitude={latitude}
                                pointCount={clusterProps.point_count}
                                totalPoints={points.length}
                                onZoom={() => handleClusterZoom(cluster.id as number, longitude, latitude)}
                            />
                        );
                    }

                    const singleProps = cluster.properties as { cluster: boolean; postId: string };
                    return (
                        <PostMarker
                            key={`post-${singleProps.postId}`}
                            postId={singleProps.postId}
                            longitude={longitude}
                            latitude={latitude}
                            onClick={() => {
                                const clickedPost = posts.find(p => p.id === singleProps.postId);
                                if (clickedPost) setSelectedPost(clickedPost);
                            }}
                        />
                    );
                })}

                {selectedPost && (
                    <PostPopup post={selectedPost} onClose={() => setSelectedPost(null)} />
                )}
            </Map>
        </MapWrapper>
    );
}