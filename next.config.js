/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  poweredByHeader: false,
  // The old tab pages are now bands on the front page
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: true },
      { source: '/experience', destination: '/#experience', permanent: true },
      { source: '/hobbies', destination: '/#off', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
