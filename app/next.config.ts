import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(`${process.env.STRAPI}/**`)],
  },
  env: {
    STRAPI: process.env.STRAPI,
    WEBSITE: process.env.WEBSITE,
  },
};

export default nextConfig;
