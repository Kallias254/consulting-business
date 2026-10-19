import path from 'path'
import { fileURLToPath } from 'url'
import redirects from './redirects.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  redirects,
  async rewrites() {
    return {
      // beforeFiles rewrites run before Next.js checks the filesystem,
      // so clean URLs like /about get internally mapped to /scholarcrafted/about
      beforeFiles: [
        // Homepage: / → /scholarcrafted
        {
          source: '/',
          destination: '/scholarcrafted',
        },
        // Catch-all: any path NOT matching other top-level apps
        // gets prefixed with /scholarcrafted
        {
          source: '/:path((?!scholarcrafted|admin|audit|dashboard|go|login|methodology|researcher|api|_next|ie-incompatible|favicon|robots|sitemap|media).*)',
          destination: '/scholarcrafted/:path*',
        },
      ],
    }
  },
}

export default nextConfig
