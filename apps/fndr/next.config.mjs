/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/shared"],
  basePath: "/apps/fndr",
};

export default nextConfig;
