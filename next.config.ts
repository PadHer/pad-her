import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
