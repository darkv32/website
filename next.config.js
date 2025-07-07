/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Temporarily disabled for testing
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }

    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    
    return config;
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
};

module.exports = nextConfig;
