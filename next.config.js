/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Improve PWA support
  experimental: {
    optimizeCss: true,
  }
};

module.exports = nextConfig;