import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        brand: {
          navy: "#0F172A",
          "navy-deep": "#1E3A8A",
          blue: "#2563EB",
          "blue-deep": "#1D4ED8",
          "blue-light": "#3B82F6",
          sky: "#0EA5E9",
          "trust-green": "#059669",
          "trust-green-light": "#10B981",
          "trust-gold": "#D97706",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-navy-blue":
          "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
        "gradient-blue":
          "linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)",
        "gradient-navy":
          "linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
        "card-border":
          "linear-gradient(135deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.02) 100%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marqueeReverse 30s linear infinite",
        "counter-up": "counterUp 2s ease-out forwards",
        "border-glow": "borderGlow 3s ease-in-out infinite",
        "scanner": "scanner 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(37,99,235,0)" },
          "50%": { boxShadow: "0 4px 14px rgba(37,99,235,0.25)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(37,99,235,0.25)" },
          "50%": { borderColor: "rgba(37,99,235,0.5)" },
        },
        scanner: {
          "0%": { top: "0%", opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
      },
      boxShadow: {
        "soft": "0 1px 3px rgba(15,23,42,0.08), 0 1px 2px rgba(15,23,42,0.04)",
        "card": "0 4px 16px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04)",
        "card-hover": "0 8px 24px rgba(15,23,42,0.1), 0 2px 6px rgba(15,23,42,0.05)",
        "primary": "0 4px 14px rgba(37,99,235,0.2)",
        "trust": "0 2px 10px rgba(5,150,105,0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
