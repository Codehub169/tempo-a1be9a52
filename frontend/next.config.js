/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Example for image optimization if you plan to use external image sources:
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'images.unsplash.com',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'example.com',
  //     },
  //   ],
  // },
  // If deploying to a subpath on a domain (e.g., example.com/transparent_rent):
  // basePath: process.env.NODE_ENV === 'production' ? '/transparent_rent' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/transparent_rent/' : '',
}

module.exports = nextConfig
