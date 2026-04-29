/**
 * PostPopup – Client Component
 * ───────────────────────────────────────────────────────────────────────
 * • Shows a popup with preview information for a post on the map.
 * • Contains title, author, a short content preview, vote stats, and a
 *   link to the full post.
 *
 * Author: Edward Reyna
 */

'use client';
import { Popup } from 'react-map-gl/maplibre';
import { PostPopupProps } from "@/app/interfaces/PostPopupProps";
import styled from "styled-components";
import Link from "next/link";

const PopupContent = styled.div`
    padding: 8px;
    max-width: 250px;
    color: #111;
`;

const PopupTitle = styled.h3`
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: bold;
`;

const PopupAuthor = styled.p`
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #666;
`;

const PopupText = styled.p`
    margin: 0 0 12px 0;
    font-size: 14px;
    line-height: 1.4;
`;

const PopupFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PopupStats = styled.span`
    font-size: 12px;
    color: #888;
    white-space: nowrap;
    margin-right: 5%;
`;

const StyledLink = styled(Link)`
    background-color: #10b981;
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.2s;
    text-align: center;

    &:hover {
        background-color: #059669;
    }
`;

export default function PostPopup({ post, onClose }: PostPopupProps) {
    // Safety check: if coordinates are missing, do not render the popup.
    if (post.longitude === undefined || post.latitude === undefined) {
        return null;
    }

    // Limit content preview length for a compact popup.
    const previewText = post.content.length > 60 ? `${post.content.substring(0, 60)}...` : post.content;

    return (
        <Popup
            longitude={post.longitude}
            latitude={post.latitude}
            anchor="bottom"
            offset={15}
            onClose={onClose}
            closeOnClick={false}   // Popup is closed explicitly via the close button.
        >
            <PopupContent>
                <PopupTitle>{post.title}</PopupTitle>
                <PopupAuthor>@{post.username}</PopupAuthor>
                <PopupText>{previewText}</PopupText>

                <PopupFooter>
                    <PopupStats>👍 {post.upvotes} | 👎 {post.downvotes}</PopupStats>
                    <StyledLink href={`/post/${post.id}`}>View Full Post</StyledLink>
                </PopupFooter>
            </PopupContent>
        </Popup>
    );
}