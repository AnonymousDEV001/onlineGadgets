/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',  // This allows images from any domain
        },
        {
          protocol: 'http',
          hostname: '**',  // Also allows images from any domain using http
        },
      ],
    },
  };
  
  export default nextConfig;
  