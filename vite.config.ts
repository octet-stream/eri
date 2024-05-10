import {vitePlugin as remix} from "@remix-run/dev"
import {defineConfig} from "vite"
import {build} from "esbuild"

import devServer from "@hono/vite-dev-server"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [
    devServer({
      injectClientScript: false,
      entry: "app/server/http/dev.ts",
      exclude: [/^\/(app)\/.+/, /^\/@.+$/, /^\/node_modules\/.*/]
    }),
    remix({
      serverBuildFile: "remix.js",
      async buildEnd() {
        try {
          build({
            outfile: "build/server/entry.hono.js",
            entryPoints: ["app/server/http/prod.ts"],
            external: ["./remix.js"],
            platform: "node",
            format: "esm",
            packages: "external",
            bundle: true,
            logLevel: "info"
          })
        } catch (error) {
          console.error(error)
          process.exit(1)
        }
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
      "mysql2",
    ]
  },
  test: {
    include: ["**/*.test.ts?(x)"],
    exclude: ["e2e", "node_modules", "src"]
  }
})
