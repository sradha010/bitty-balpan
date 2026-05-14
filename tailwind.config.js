/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        "primary-foreground": "#FFFFFF",
        sky: "#38BDF8",
        sun: "#FACC15",
        coral: "#FB7185",
        mint: "#34D399",
        warm: "#FAFAFA",
        surface: "#F3F4F6",
        border: "#E5E7EB",
        foreground: "#111827",
        "muted-foreground": "#6B7280",
        ink: "#0F172A",
        background: "#FAFAFA",
        accent: "#F3F4F6",
      },
      fontFamily: {
        display: ["Outfit", "Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        blob: "blob 12s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(20px,-20px) scale(1.05)" },
          "66%": { transform: "translate(-15px,10px) scale(0.97)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
    },
  },
  plugins: [],
};