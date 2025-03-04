// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors:  "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  // webpack: config => {
  //   config.resolve.fallback = { fs: false, net: false, tls: false,  cache: false};
  //   config.externals.push("pino-pretty", "lokijs", "encoding");
  //   return config;
  // },
};

module.exports = nextConfig;
