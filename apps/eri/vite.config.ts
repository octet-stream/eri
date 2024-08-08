import {devServer} from "react-router-hono-server/dev"
import {vitePlugin as remix} from "@remix-run/dev"
import {installGlobals} from "@remix-run/node"
import {defineConfig} from "vite"

import tsconfigPaths from "vite-tsconfig-paths"
import buildMigrations from "@eri-dev/vite-plugin-mikro-orm-config"

installGlobals({nativeFetch: true})

export default defineConfig({
  plugins: [
    devServer(),
    remix({
      future: {
        unstable_singleFetch: true
      }
    }),
    buildMigrations({configEntry: "app/server/lib/db/configs/prod.ts"}) as any,
    tsconfigPaths()
  ],
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
    include: ["**/*.test.ts?(x)"],
    exclude: ["e2e", "node_modules", "src"]
  }
})
