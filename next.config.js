/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.linebot.site",
        port: "",
        pathname: "/",
      },
    ],
  },
};

module.exports = nextConfig;
