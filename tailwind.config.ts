import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          0: "#000000",
          1: "#0a0a0a",
          2: "#111111",
          3: "#181818",
          4: "#202020",
          5: "#2a2a2a",
          6: "#333333",
        },
        ink: {
          DEFAULT: "#ffffff",
          secondary: "#a1a1aa",
          muted: "#71717a",
          faint: "#3f3f46",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-up-delay": "fadeUp 0.5s ease 0.15s forwards",
        "slide-in-left": "slideInLeft 0.4s ease forwards",
        "scale-in": "scaleIn 0.3s ease forwards",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-white": "pulseWhite 2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseWhite: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(255,255,255,0.05)",
        "glow-md": "0 0 40px rgba(255,255,255,0.08)",
        "glow-lg": "0 0 80px rgba(255,255,255,0.06)",
        "card": "0 1px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
