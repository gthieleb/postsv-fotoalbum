/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['framer-motion']
  }
}

module.exports = nextConfig