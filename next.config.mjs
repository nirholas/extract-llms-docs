/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Ignore ESLint during builds (TypeScript handles type checking)
    ignoreDuringBuilds: true,
  },
  // The MkDocs site is published at docs.llm.energy. Page paths under /docs go there;
  // files with an extension (/docs/llms.txt, /docs/install.md) are still served from public/.
  async redirects() {
    return [
      { source: '/docs', destination: 'https://docs.llm.energy/', permanent: true },
      { source: '/docs/:path((?!.*\\.).*)', destination: 'https://docs.llm.energy/:path/', permanent: true },
    ]
  },
}

export default nextConfig
