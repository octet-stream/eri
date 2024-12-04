import {reactRouter} from "@react-router/dev/vite"
import {reactRouterHonoServer} from "react-router-hono-server/dev"
import {defineConfig} from "vite"

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
  }
})
