import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["media.licdn.com", "img.clerk.com"],
    unoptimized: true,
  },
};

export default nextConfig;
