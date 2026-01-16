/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Ignore ESLint during builds (TypeScript handles type checking)
    ignoreDuringBuilds: true,
  },
  trailingSlash: false,
  async rewrites() {
    return [
      // Serve MkDocs static files from /docs
      {
        source: '/docs',
        destination: '/docs/index.html',
      },
      {
        source: '/docs/:path*',
        destination: '/docs/:path*',
      },
    ]
  },
  async redirects() {
    return [
      // Ensure /docs always has trailing slash for relative paths to work
      {
        source: '/docs',
        destination: '/docs/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
