import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Load Balancing & Performance Optimization
  compress: true, // Enable gzip & brotli compression across all routes
  poweredByHeader: false, // Remove X-Powered-By header to minimize payload & prevent fingerprinting
  
  // 2. High-Performance Image Optimization with Edge Caching
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    minimumCacheTTL: 86400, // 24-hour edge cache for remote imagery
    formats: ["image/avif", "image/webp"],
  },

  // 3. React Strict Mode for predictable rendering
  reactStrictMode: true,
};

export default nextConfig;
