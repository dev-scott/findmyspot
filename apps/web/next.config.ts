import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@findmyspot/ui', '@findmyspot/network', '@findmyspot/forms'],
};

export default nextConfig;
