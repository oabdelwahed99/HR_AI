/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure clean builds
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
