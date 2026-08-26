/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "taxi-werbung.org" },
      { protocol: "http", hostname: "taxi-werbung.org" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/de",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;