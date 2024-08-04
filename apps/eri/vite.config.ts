import {vitePlugin as remix} from "@remix-run/dev"
import {defineConfig} from "vite"

import devServer from "@hono/vite-dev-server"
import tsconfigPaths from "vite-tsconfig-paths"

import buildServer from "@eri-dev/vite-plugin-build-server"
import buildMigrations from "@eri-dev/vite-plugin-mikro-orm-config"

export default defineConfig({
  plugins: [
    devServer({
      injectClientScript: false,
      entry: "app/server/http/dev.ts",
      exclude: [/^\/(app)\/.+/, /^\/@.+$/, /^\/node_modules\/.*/]
    }),
    remix({serverBuildFile: "remix.js"}),
    buildServer({remixBundleName: "./remix.js"}),
    buildMigrations({configEntry: "app/server/lib/db/configs/prod.ts"}),
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
