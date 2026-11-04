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
  async redirects() {
    // Browsers and crawlers ask for /favicon.ico by default; the icon is generated, so point them at it
    return [{ source: '/favicon.ico', destination: '/icon', permanent: false }];
  },
  async rewrites() {
    /* A post also exists as plain markdown, for agents: /blog/<slug>.md, or the post's own address from a client that asks for text/markdown (as agent fetch tools do). */
    return {
      beforeFiles: [
        { source: '/blog/:slug.md', destination: '/blog/:slug/md' },
        { source: '/blog/:slug', has: [{ type: 'header', key: 'accept', value: '(?:.*,\\s*)?text/markdown.*' }], destination: '/blog/:slug/md' },
      ],
    };
  },
  async headers() {
    /* Files in /public are served with no cache lifetime by default, so a returning visitor asks again for each one. Pictures and sprites rarely change, so a day is kept
       and a stale copy is served for a week while the new one is fetched. The CSS reads /field/terran.png directly, which is why this matters for more than the photos. */
    const assetCache = { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' };
    return [
      { source: '/field/:path*', headers: [assetCache] },
      { source: '/portrait/:path*', headers: [assetCache] },      {
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
