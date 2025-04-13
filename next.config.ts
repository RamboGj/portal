import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "imgs.search.brave.com",
      }
    ]
  }
};

export default nextConfig;
