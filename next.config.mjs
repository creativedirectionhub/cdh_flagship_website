/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/work/four-seasons-anguilla", destination: "/work/island-resort-arrival", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "d2ol7oe51mr4n9.cloudfront.net", pathname: "/user_35SNUXuDx8PwiiQXCbLt8W4KG7m/**" }],
  },
};
export default nextConfig;
