import BlogMap from "@/app/components/BlogMap";
import styled from "styled-components";
import getAllPosts from "@/lib/getAllPosts";

const PageMain = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.h1`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
`;

const PageDescription = styled.p`
  margin-bottom: 2rem;
  color: #555;
`;

export default async function MapPage() {
    const posts = await getAllPosts();

    return (
        <PageMain>
            <PageHeader>Global Blog Explorer</PageHeader>
            <PageDescription>
                Zoom out to see grouped posts, or zoom in to see individual pins!
            </PageDescription>
            <BlogMap posts={posts} />
        </PageMain>
    );
}