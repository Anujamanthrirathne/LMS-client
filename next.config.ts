/** @type {import('next').nextConfig} */
const nextConfig = {
  experimental: {
    turbo: {}, // Keep empty object or remove entirely
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'randomuser.me',
      'th.bing.com',
      'localhost',
      'res-console.cloudinary.com'
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
