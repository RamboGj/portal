import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "imgs.search.brave.com",
      },
      {
        hostname: "images.unsplash.com"
      },
      {
        hostname: 'images.ctfassets.net'
      }
    ]
  }
};

export default nextConfig;
