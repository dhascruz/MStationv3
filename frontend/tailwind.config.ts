import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#b3ccff",
          300: "#80a9ff",
          400: "#4d7fff",
          500: "#2456f2",
          600: "#1a3fc9",
          700: "#15319e",
          800: "#132a7e",
          900: "#0f2160",
          950: "#0a1740",
        },
        slate: {
          925: "#0b1220",
        },
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(15, 33, 96, 0.06), 0 1px 3px 0 rgba(15, 33, 96, 0.08)",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
