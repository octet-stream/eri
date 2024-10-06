import {devServer} from "react-router-hono-server/dev"
import {vitePlugin as remix} from "@remix-run/dev"
import {installGlobals} from "@remix-run/node"
import {defineConfig} from "vite"

import tsconfigPaths from "vite-tsconfig-paths"

installGlobals({nativeFetch: true})

declare module "@remix-run/server-runtime" {
  interface Future {
    unstable_singleFetch: true // 👈 this enables _types_ for single-fetch
  }
}

export default defineConfig({
  plugins: [
    devServer(),
    remix({
      ignoredRouteFiles: ["**/*.test.ts?(x)"],
      future: {
        unstable_singleFetch: true,
        unstable_lazyRouteDiscovery: true,
        unstable_optimizeDeps: true
      }
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
  build: {
    target: "esnext"
  },
  test: {
    include: ["**/*.test.ts?(x)"],
    exclude: ["e2e", "node_modules", "src"],
    pool: "threads",
    globalSetup: ["scripts/vitest/global-setup/db.ts"]
  }
})
