import {devServer} from "react-router-hono-server/dev"
import {vitePlugin as remix} from "@remix-run/dev"
import {installGlobals} from "@remix-run/node"
import {defineConfig} from "vite"

import tsconfigPaths from "vite-tsconfig-paths"

installGlobals({nativeFetch: true})

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true // 👈 this enables _types_ for single-fetch
  }
}

const TESTS_SEARCH_PATTERN = "**/*.test.ts?(x)"

export default defineConfig({
  plugins: [
    devServer(),
    remix({
      ignoredRouteFiles: [TESTS_SEARCH_PATTERN],
      future: {
        v3_singleFetch: true,
        v3_fetcherPersist: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
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
    include: [TESTS_SEARCH_PATTERN],
    exclude: ["e2e", "node_modules", "src"],
    pool: "threads",
    globalSetup: ["scripts/vitest/global-setup/db.ts"]
  }
})
