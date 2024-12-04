import {reactRouter} from "@react-router/dev/vite"
import {reactRouterHonoServer} from "react-router-hono-server/dev"
import {defineConfig} from "vite"

export const TESTS_SEARCH_PATTERN = "**/*.test.ts?(x)"

export default defineConfig({
  plugins: [reactRouterHonoServer(), reactRouter()],
  optimizeDeps: {
    exclude: [
      "oslo",
      "lucia",
      "@mikro-orm/core",
      "@mikro-orm/mysql",
      "@mikro-orm/knex",
      "@mikro-orm/seeder",
      "@mikro-orm/migrations",
      "mysql2"
    ]
  },
  build: {
    target: "esnext"
  },
  test: {
    include: [TESTS_SEARCH_PATTERN],
    exclude: ["e2e", "node_modules", "src"],
    pool: "threads",
    globalSetup: ["scripts/vitest/global-setup/db.ts"]
  }
})
