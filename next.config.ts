/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/postsv-fotoalbum',
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['framer-motion']
  },
  distDir: 'out',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig