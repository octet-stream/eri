import type {Config} from "postcss-load-config"

import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

export default {
  plugins: [autoprefixer(), tailwindcss()]
} satisfies Config
