//next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ["linktree.sirv.com", "firebasestorage.googleapis.com"],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'app/components'),
      '@important': path.resolve(__dirname, 'important'),
      '@forget-password-pages': path.resolve(__dirname, 'app/(forget password pages)'),
      '@forget-password': path.resolve(__dirname, 'app/forget-password/forgot-password'),
      '@dashboard': path.resolve(__dirname, 'app/dashboard'),
      '@elements': path.resolve(__dirname, 'app/elements'),
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@LocalHooks': path.resolve(__dirname, 'LocalHooks'),
      '@lib': path.resolve(__dirname, 'lib'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@login': path.resolve(__dirname, 'app/login'),
      '@signup': path.resolve(__dirname, 'app/signup'),
      '@styles': path.resolve(__dirname, 'styles'),
      '@user': path.resolve(__dirname, 'app/[userId]'),
      '@': path.resolve(__dirname, 'app')
    };
    return config;
  },
  // Add security headers to protect your application
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // Content Security Policy to prevent XSS attacks
          // You may need to customize this based on your app's requirements
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://*.firebaseio.com https://*.firebase.com https://*.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://firebasestorage.googleapis.com https://linktree.sirv.com https://*.googleusercontent.com; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebase.com wss://*.firebaseio.com https://*.gstatic.com https://*.stripe.com; frame-src 'self' https://*.stripe.com https://*.firebaseio.com https://*.firebase.com; object-src 'none'"
          }
        ]
      }
    ];
  },
  // Add environment variable configuration
  env: {
    // Only include client-side environment variables here
    // Server-side variables will be loaded from Vercel or .env.local
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STORE_URL: process.env.NEXT_PUBLIC_STORE_URL
  },
  // Improve security by enabling React strict mode
  reactStrictMode: true,
  // Improve build performance
  swcMinify: true,
  // Compress responses
  compress: true,
};

module.exports = nextConfig;