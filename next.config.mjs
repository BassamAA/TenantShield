/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      root: new URL('.', import.meta.url).pathname,
    },
  },
  // Required for @react-pdf/renderer server-side rendering
  serverExternalPackages: ['@react-pdf/renderer'],
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
