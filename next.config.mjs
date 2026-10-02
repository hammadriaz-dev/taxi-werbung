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
      // One privacy-policy address everywhere: /de/privacy (and /en/privacy).
      // The old /datenschutz URL redirects permanently so existing links and
      // search results keep working.
      {
        source: "/:locale(de|en)/datenschutz",
        destination: "/:locale/privacy",
        permanent: true,
      },
      {
        source: "/datenschutz",
        destination: "/de/privacy",
        permanent: true,
      },
      {
        source: "/",
        destination: "/de",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;