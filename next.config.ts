const nextConfig = {
  experimental: {
    appDir: true,
    turbo: false,
     reactRoot: true,
     suppressHydrationWarning: true,
  },
  images: {
    domains: ['res.cloudinary.com','randomuser.me','th.bing.com','localhost' ,'res-console.cloudinary.com'],
  },
  reactStrictMode: false,

  

};

export default nextConfig;