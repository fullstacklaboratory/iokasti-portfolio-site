/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.iokastimantzog.com",
        // port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
