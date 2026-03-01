/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['framer-motion']
  }
}

module.exports = nextConfig