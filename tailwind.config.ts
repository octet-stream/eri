import typography from "@tailwindcss/typography"
import device from "tailwindcss-device"

import type {Config} from "tailwindcss"

// Screen sizes
const mobile = "450px"
const laptop = "1024px"
const desktop = "1280px"

export default {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      width: {
        mobile,
        laptop,
        desktop
      },
      maxWidth: {
        mobile,
        laptop,
        desktop
      }
    },
    screens: {
      mobile,
      laptop,
      desktop
    }
  },
  plugins: [
    typography,
    device
  ]
} satisfies Config
