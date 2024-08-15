import type {Config} from "tailwindcss"

import animate from "tailwindcss-animate"

// Screen sizes
const mobile = "450px"
const laptop = "1024px"
const desktop = "1280px"
const post = "800px"

const dynamicScreenWidth = "100dvw"
const dynamicScreenHeight = "100dvh"
const dynamicScreenKey = "dynamic-screen"

export default {
  content: {
    relative: true,
    files: ["app/**/*.tsx"]
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      screens: {
        mobile,
        laptop,
        desktop,
        post
      },
      minWidth: {
        [dynamicScreenKey]: dynamicScreenWidth
      },
      width: {
        [dynamicScreenKey]: dynamicScreenWidth,
        mobile,
        laptop,
        desktop,
        post
      },
      maxWidth: {
        [dynamicScreenKey]: dynamicScreenWidth,
        mobile,
        laptop,
        desktop,
        post
      },
      minHeight: {
        [dynamicScreenKey]: dynamicScreenHeight
      },
      height: {
        [dynamicScreenKey]: dynamicScreenHeight
      },
      maxHeight: {
        [dynamicScreenKey]: dynamicScreenHeight
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: {height: "0"},
          to: {height: "var(--radix-accordion-content-height)"}
        },
        "accordion-up": {
          from: {height: "var(--radix-accordion-content-height)"},
          to: {height: "0"}
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [animate]
} satisfies Config
