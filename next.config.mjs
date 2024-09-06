import { env } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = { images: {
  domains:[new URL(env.backUrl).hostname],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        port: '',
        pathname: '/icon/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '7115',
        pathname: '/**',
      },
    ],
  },};

export default nextConfig;
