import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#E50914", // Primary RedSavior Red
          700: "#B80012", // Deep Red
          800: "#991B1B",
          900: "#7F1D1D",
        },
        navy: {
          800: "#1E293B",
          900: "#0F172A", // Sidebar Navy
          950: "#0B1120",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-hind-siliguri)", "sans-serif"],
        bangla: ["var(--font-hind-siliguri)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
