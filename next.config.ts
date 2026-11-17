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
    ];
  },
};

export default nextConfig;
