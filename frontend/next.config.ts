import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://127.0.0.1:8000/api/v1/:path*",
  //     },
  //   ]
  // },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
