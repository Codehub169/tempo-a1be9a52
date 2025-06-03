/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ensures static HTML export
  reactStrictMode: true,
  // For `output: 'export'`, Next.js's image optimization (via /_next/image) is not available.
  // Images from remote sources (like Unsplash) will be served directly from their URLs.
  // `next/image` component will still provide benefits like layout, priority, lazy loading.
  // If you were *not* using `output: 'export'` or had a custom image loader that required it,
  // you would configure remotePatterns here:
  images: {
    // remotePatterns are not strictly necessary for `output: 'export'` if images are fetched client-side directly,
    // but good to have if any build-time image processing were to occur for these domains.
    // For Unsplash, it's a common pattern to add:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Often Unsplash URLs resolve here
      },
      // Add other image source hostnames if needed
    ],
    // If you want to disable optimization entirely for all images (not usually recommended unless necessary):
    // unoptimized: true, 
  },
  // If deploying to a subpath on a domain (e.g., example.com/transparent_rent):
  // basePath: process.env.NODE_ENV === 'production' ? '/transparent_rent' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/transparent_rent/' : '',
}

module.exports = nextConfig
