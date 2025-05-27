import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("http://localhost:1337/**")],
  },
  env: {
    STRAPI: "http://localhost:133",
    WEBSITE: "http://localhost:3000",
  },
};

export default nextConfig;
