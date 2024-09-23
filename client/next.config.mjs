// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// next.config.js
/** /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'profinder.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;