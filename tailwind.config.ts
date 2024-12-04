import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {
      spacing: {
        18: "4.5rem", // Use strings, not numbers
        28: "7rem",
      },
      borderRadius: {
        xl: "1.25rem", // Use strings for border-radius
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
