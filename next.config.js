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
      '@/components': path.resolve(__dirname, 'app/components'),
      '@/important': path.resolve(__dirname, 'important'),
      '@/forget-password-pages': path.resolve(__dirname, 'app/(forget password pages)'),
      '@/forget-password': path.resolve(__dirname, 'app/forget-password/forgot-password'),
      '@/dashboard': path.resolve(__dirname, 'app/dashboard'),
      '@/elements': path.resolve(__dirname, 'app/elements'),
      '@/hooks': path.resolve(__dirname, 'hooks'),
      '@/LocalHooks': path.resolve(__dirname, 'LocalHooks'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/utils': path.resolve(__dirname, 'utils'),
      '@/login': path.resolve(__dirname, 'app/login'),
      '@/signup': path.resolve(__dirname, 'app/signup'),
      '@/styles': path.resolve(__dirname, 'styles'),
      '@/user': path.resolve(__dirname, 'app/[userId]'),
      '@/app': path.resolve(__dirname, 'app')
    };
    return config;
  },
};

module.exports = nextConfig;