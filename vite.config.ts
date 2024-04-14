import {vitePlugin as remix} from "@remix-run/dev"
import {installGlobals} from "@remix-run/node"
import {defineConfig} from "vite"

import devServer from "@hono/vite-dev-server"
import tsconfigPaths from "vite-tsconfig-paths"

installGlobals()

export default defineConfig({
  plugins: [
    devServer({
      injectClientScript: false,
      entry: "app/server/http/dev.ts",
      exclude: [/^\/(app)\/.+/, /^\/@.+$/, /^\/node_modules\/.*/]
    }),
    remix({
      serverBuildFile: "remix.js"
      // TODO: Add production server build
    }),
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
  test: {
    include: ["**/*.test.ts?(x)"],
    exclude: ["e2e", "node_modules", "src"]
  }
})
