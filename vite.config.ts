import {reactRouter} from "@react-router/dev/vite"
import {reactRouterDevTools} from "react-router-devtools"
import {reactRouterHonoServer} from "react-router-hono-server/dev"
import {defineConfig} from "vite"

export default defineConfig({
  plugins: [reactRouterHonoServer(), reactRouterDevTools(), reactRouter()],
  optimizeDeps: {
    exclude: ["@node-rs/argon2"]
  },
  build: {
    target: "esnext"
  },
  resolve: {
    alias: {
      "@tiptap/core/jsx-dev-runtime": "@tiptap/core/jsx-runtime"
    }
  }
})
