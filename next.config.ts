import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  },
  serverExternalPackages: ['pdfjs-dist'],
};

export default nextConfig;
