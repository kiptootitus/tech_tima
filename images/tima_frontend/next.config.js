// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    // 👇 Add this:
    allowedDevOrigins: ["http://cybelimited.local", "https://cybelimited.local"]
  },
};

module.exports = nextConfig;
