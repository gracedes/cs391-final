import BlogMap from "@/app/components/map/BlogMap";
import styled from "styled-components";
import getAllPosts from "@/lib/getAllPosts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Revival | Map",
    description: "Revival's Map Blog Explorer Feature",
};

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


const PageHeader = styled.h1`
  margin-bottom: 2%;
  font-size: calc(2px + 2.2vw);
  color: white;
  font-weight: bold;
`;

const PageDescription = styled.p`
  margin-bottom: 2%;
  font-size: calc(2px + 1.5vw);
  color: white;
`;

export default async function MapPage() {
    const posts = await getAllPosts();


    return (
        <PageWrapper>
            <PageHeader>Map Blog Explorer</PageHeader>
            <PageDescription>
                Zoom out to see grouped posts, or zoom in to see individual pins!
            </PageDescription>
            <BlogMap posts={posts} />
        </PageWrapper>
    );
}