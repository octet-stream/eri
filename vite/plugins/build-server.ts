import type {Plugin} from "vite"
import {build} from "esbuild"

interface BuildServerPluginOptions {
  /**
   * Remix bundle id to be excluded from server bundle dependencies
   */
  remixBundleName: string

  entryPoint?: string

  outputFile?: string
}

export default function buildServer(options: BuildServerPluginOptions): Plugin {
  return {
    name: "vite-plugin-eri-build-server",
    enforce: "post",

    // Apply this plugin only for production ssr builds
    apply: ({build}, {command}) => !!(build?.ssr && command === "build"),

    async buildEnd() {
      await build({
        outfile: "build/server/entry.hono.js",
        entryPoints: ["app/server/http/prod.ts"],
        external: [options.remixBundleName],
        platform: "node",
        format: "esm",
        packages: "external",
        bundle: true,
        logLevel: "info"
      })
    }
  }
}
