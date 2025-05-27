import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: `**`, port: `` }],
  },
  env: {
    STRAPI: process.env.STRAPI,
    WEBSITE: process.env.WEBSITE,
  },
};

export default nextConfig;
