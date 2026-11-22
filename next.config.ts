import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "gsap"],
  agentRules: false,
  async redirects() {
    return [
      {
        source: "/process",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/made-to-measure",
        destination: "/services/su-misura",
        permanent: true,
      },
      {
        source: "/services/bespoke",
        destination: "/services/su-misura",
        permanent: true,
      },
      {
        source: "/services/personal-styling",
        destination: "/services/consulting",
        permanent: true,
      },
      {
        source: "/services/private-wardrobe",
        destination: "/services/wardrobe-management",
        permanent: true,
      },
      {
        source: "/services/club-tailoring",
        destination: "/services/garment-refinement",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
