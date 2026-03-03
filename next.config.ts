/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['framer-motion']
  },
  // Fix for GitHub Pages routing
  distDir: 'out',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig