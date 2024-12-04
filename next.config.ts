import type { NextConfig } from "next";
import path from "path"; // Ensure the 'path' module is imported

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React strict mode
  images: {
    domains: ["example.com"], // Replace with allowed image domains
    formats: ["image/avif", "image/webp"], // Enable modern image formats
  },
  env: {
    CUSTOM_VARIABLE: "value", // Replace with your custom environment variables
  },
  i18n: {
    locales: ["en", "es"], // Supported locales
    defaultLocale: "en", // Default locale
  },
  webpack: (config) => {
    // Customize Webpack configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"), // Alias '@' to 'src'
    };
    return config;
  },
};

export default nextConfig;
