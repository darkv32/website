/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Temporarily disabled for testing
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
