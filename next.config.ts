import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Reduce reliance on native modules for CSS processing
    optimizeCss: false,
  },
  // Handle LightningCSS properly
  serverExternalPackages: ['lightningcss'],
};

export default nextConfig;
