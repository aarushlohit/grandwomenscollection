import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1440px"
      }
    },
    extend: {
      colors: {
        background: "oklch(97.2% 0.007 85.89)",
        foreground: "oklch(19.5% 0.01 40.38)",
        muted: "oklch(91.7% 0.009 79.53)",
        border: "oklch(84.2% 0.01 77.23)",
        card: "oklch(94.8% 0.008 83.13)",
        accent: "oklch(37.8% 0.02 27.43)",
        cream: "oklch(96.3% 0.01 85.2)",
        ink: "oklch(16.3% 0.015 32.4)",
        gold: {
          DEFAULT: "oklch(69.2% 0.12 72.8)",
          light: "oklch(82% 0.08 72.8)",
          dark: "oklch(55% 0.14 72.8)"
        },
        rose: "oklch(64% 0.09 22.7)",
        success: "oklch(64.8% 0.15 151.8)",
        danger: "oklch(57.2% 0.2 27.4)",
        ivory: "oklch(96.3% 0.01 85.2)",
        charcoal: "oklch(25% 0.01 40)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      },
      fontSize: {
        "display": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "0.88", letterSpacing: "-0.04em", fontWeight: "600" }],
        "editorial": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "0.92", letterSpacing: "-0.03em", fontWeight: "500" }],
        "headline": ["clamp(2rem, 4vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "500" }],
        "subhead": ["clamp(1.25rem, 2vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "400" }]
      },
      boxShadow: {
        editorial: "0 30px 80px rgba(24, 19, 17, 0.12)",
        panel: "0 18px 60px rgba(10, 10, 10, 0.08)",
        luxury: "0 25px 60px rgba(0, 0, 0, 0.08), 0 4px 20px rgba(0, 0, 0, 0.04)",
        glow: "0 0 40px rgba(196, 145, 83, 0.15)",
        "card-hover": "0 35px 80px rgba(24, 19, 17, 0.18), 0 8px 30px rgba(0, 0, 0, 0.06)"
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem"
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        "fade-up": "fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 600ms ease-out both",
        "slide-in-right": "slide-in-right 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "marquee": "marquee 30s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "delay-100": "fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 100ms both",
        "delay-200": "fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both",
        "delay-300": "fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 300ms both",
        "delay-400": "fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both",
        "delay-500": "fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 500ms both"
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default tailwindConfig;
