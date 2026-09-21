import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "gsap"],
  agentRules: false,
};

export default nextConfig;
