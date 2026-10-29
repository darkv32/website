/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The first format the browser accepts wins, so AVIF has to come before WebP to ever be served
    formats: ['image/avif', 'image/webp'],
    // Photos in /public never change under the same name, so there is no need to re-check them every minute
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [new URL('https://images.pexels.com/photos/**')],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

// The analyzer is a dev dependency, so it is only loaded for `bun run analyze`.
module.exports = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })(nextConfig)
  : nextConfig;
