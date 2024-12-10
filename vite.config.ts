import {reactRouter} from "@react-router/dev/vite"
import {reactRouterHonoServer} from "react-router-hono-server/dev"
import {defineConfig} from "vite"

export default defineConfig({
  plugins: [reactRouterHonoServer(), reactRouter()],
  optimizeDeps: {
    exclude: [
      "@node-rs/argon2",
      "@mikro-orm/core",
      "@mikro-orm/mariadb",
      "@mikro-orm/knex",
      "@mikro-orm/seeder",
      "@mikro-orm/migrations"
    ]
  },
  build: {
    target: "esnext"
  }
})
