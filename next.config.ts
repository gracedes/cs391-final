import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**'
            }
        ]
    },
    compiler: {
        styledComponents: true,
    },
};

export default nextConfig;
