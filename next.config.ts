import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Next.js only serves image qualities listed here. 75 is the default for
    // every image; 85 is used for the home hero, which is shown large.
    qualities: [75, 85],
  },
};

export default nextConfig;
