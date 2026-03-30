import type { Config } from "tailwindcss"

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
          "urgent-glow": "urgentGlow 2.5s ease-in-out infinite",
          "urgent-pill": "urgentGlow 2.5s ease-in-out infinite",
          "flame-flicker": "flameFlicker 0.9s infinite ease-in-out",
        },
        keyframes: {
          urgentGlow: {
            "0%, 100%": {
              boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 0 0 rgba(249,115,22,0)",
              transform: "scale(1)",
            },
            "50%": {
              boxShadow: "0 8px 22px rgba(249,115,22,0.22), 0 0 18px rgba(249,115,22,0.18)",
              transform: "scale(1.00)",
            },
          },
          urgentPill: {
            "0%, 100%": {
              transform: "scale(1)",
              boxShadow: "0 0 0 rgba(249,115,22,0)",
            },
            "50%": {
              transform: "scale(1.06)",
              boxShadow: "0 0 14px rgba(249,115,22,0.45)",
            },
          },
          flameFlicker: {
            "0%, 100%": {
              transform: "scale(1) rotate(0deg)",
              opacity: "1",
            },
            "25%": {
              transform: "scale(1.1) rotate(-2deg)",
              opacity: "0.9",
            },
            "50%": {
              transform: "scale(0.95) rotate(2deg)",
              opacity: "1",
            },
            "75%": {
              transform: "scale(1.05) rotate(-1deg)",
              opacity: "0.95",
            },
          },
        },
      backgroundColor: {
        primary: "rgba(var(--bg-primary))",
        secondary: "rgba(var(--bg-secondary))",
        tertiary: "rgba(var(--bg-tertiary))",
        disabled: "rgba(var(--bg-disabled))",
        component: {
          DEFAULT: "rgba(var(--bg-component-primary))",
          hover: "rgba(var(--bg-component-primary-hover))",
          secondary: {
            DEFAULT: "rgba(var(--bg-component-secondary))",
            hover: "rgba(var(--bg-component-secondary-hover))",
          },
        },
        action: {
          DEFAULT: "rgba(var(--bg-action-primary))",
          hover: "rgba(var(--bg-action-primary-hover))",
          pressed: "rgba(var(--bg-action-primary-pressed))",
          secondary: {
            DEFAULT: "var(--bg-action-secondary)",
            hover: "var(--bg-action-secondary-hover)",
            pressed: "var(--bg-action-secondary-pressed)",
          },
          tertiary: {
            DEFAULT: "var(--bg-action-tertiary)",
            hover: "var(--bg-action-tertiary-hover)",
            pressed: "var(--bg-action-tertiary-pressed)",
          },
        },
        positive: {
          DEFAULT: "rgba(var(--bg-positive-primary))",
          hover: "rgba(var(--bg-positive-primary-hover))",
          pressed: "rgba(var(--bg-positive-primary-pressed))",
          secondary: {
            DEFAULT: "rgba(var(--bg-positive-secondary))",
            hover: "rgba(var(--bg-positive-secondary-hover))",
            pressed: "rgba(var(--bg-positive-secondary-pressed))",
          },
        },
        negative: {
          DEFAULT: "rgba(var(--bg-negative-primary))",
          hover: "rgba(var(--bg-negative-primary-hover))",
          pressed: "rgba(var(--bg-negative-primary-pressed))",
          secondary: {
            DEFAULT: "rgba(var(--bg-negative-secondary))",
            hover: "rgba(var(--bg-negative-secondary-hover))",
            pressed: "rgba(var(--bg-negative-secondary-pressed))",
          },
        },
        warning: {
          DEFAULT: "rgba(var(--bg-warning-primary))",
          hover: "rgba(var(--bg-warning-primary-hover))",
          pressed: "rgba(var(--bg-warning-primary-pressed))",
          secondary: {
            DEFAULT: "rgba(var(--bg-warning-secondary))",
            hover: "rgba(var(--bg-warning-secondary-hover))",
            pressed: "rgba(var(--bg-warning-secondary-pressed))",
          },
        },
      },
      colors: {
        primary: "rgba(var(--content-primary))",
        secondary: "rgba(var(--content-secondary))",
        tertiary: "rgba(var(--content-tertiary))",
        disabled: "rgba(var(--content-disabled))",
        action: {
          DEFAULT: "rgba(var(--content-action-primary))",
          hover: "rgba(var(--content-action-primary-hover))",
          pressed: "rgba(var(--content-action-primary-pressed))",
          on: {
            primary: "rgba(var(--content-action-on-primary))",
            secondary: "rgba(var(--content-action-on-secondary))",
            tertiary: "rgba(var(--content-action-on-tertiary))",
          },
        },
        positive: {
          DEFAULT: "rgba(var(--content-positive-primary))",
          on: {
            primary: "rgba(var(--content-positive-on-primary))",
            secondary: "rgba(var(--content-positive-on-secondary))",
          },
        },
        negative: {
          DEFAULT: "rgba(var(--content-negative-primary))",
          on: {
            primary: "rgba(var(--content-negative-on-primary))",
            secondary: "rgba(var(--content-negative-on-secondary))",
          },
        },
        warning: {
          DEFAULT: "rgba(var(--content-warning-primary))",
          on: {
            primary: "rgba(var(--content-warning-on-primary))",
            secondary: "rgba(var(--content-warning-on-secondary))",
          },
        },
      },
      borderColor: {
        DEFAULT: "rgba(var(--border-primary))",
        secondary: "rgba(var(--border-secondary))",
        action: "rgba(var(--border-action))",
        negative: {
          DEFAULT: "rgba(var(--border-negative-primary))",
          secondary: "rgba(var(--border-negative-secondary))",
        },
        positive: {
          DEFAULT: "rgba(var(--border-positive-primary))",
          secondary: "rgba(var(--border-positive-secondary))",
        },
        warning: {
          DEFAULT: "rgba(var(--border-warning-primary))",
          secondary: "rgba(var(--border-warning-secondary))",
        },
        disabled: "rgba(var(--border-disabled))",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        full: "1000px",
      },
      fill: {
        primary: "rgba(var(--content-action-on-primary))",
        secondary: "rgba(var(--content-action-on-secondary))",
        disabled: "rgba(var(--content-disabled))",
      },
    },
  },
  plugins: [],
} satisfies Config
