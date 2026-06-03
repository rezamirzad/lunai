/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/shared"],
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./content/**/*'],
    },
  },
  async rewrites() {
    return [
      {
        source: '/apps/fndr/:path*',
        destination: 'http://localhost:3004/apps/fndr/:path*',
      },
    ];
  },
};

export default nextConfig;
