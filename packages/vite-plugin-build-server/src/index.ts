import {join, basename, isAbsolute} from "node:path"

import type {Plugin, ResolvedConfig} from "vite"
import {normalizePath} from "vite"
import {build} from "esbuild"

interface BuildServerPluginOptions {
  /**
   * Remix bundle id to be excluded from server bundle dependencies.
   *
   * This path would be relative to the server's output file path
   */
  remixBundleName: string

  /**
   * Path to server entry point
   */
  entryPointFileName?: string

  /**
   * Path to server output file
   */
  outputFileName?: string
}

const defaults: Required<Omit<BuildServerPluginOptions, "remixBundleName">> = {
  entryPointFileName: "app/server/http/prod.ts",
  outputFileName: "entry.hono.js"
}

function normalizeEntryPointFileName(
  fileName: string,
  config: ResolvedConfig
): string {
  const path = isAbsolute(fileName)
    ? fileName
    : normalizePath(join(config.root, fileName))

  if (!path.startsWith(config.root)) {
    throw Error(
      `Unable to resolve server entry poing: The path bust be within the project's root. Received: ${path}`
    )
  }

  return path
}

/**
 * Builds Hono server for Remix integration in production
 */
export default function buildServer(options: BuildServerPluginOptions): Plugin {
  let config: ResolvedConfig | undefined

  return {
    name: "vite-plugin-eri-build-server",

    // Apply this plugin only for production ssr builds
    apply: ({build}, {command}) => !!(build?.ssr && command === "build"),

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    async buildEnd() {
      if (!config) {
        return this.error("Cannot run this plugin without resolved config")
      }

      const {outputFileName, remixBundleName, entryPointFileName} = {
        ...defaults,
        ...options
      }

      const result = await build({
        entryPoints: [normalizeEntryPointFileName(entryPointFileName, config)],
        external: [remixBundleName],
        platform: "node",
        format: "esm",
        packages: "external",
        bundle: true,
        write: false,
        logLevel: "info"
      })

      const [file] = result.outputFiles

      this.emitFile({
        type: "prebuilt-chunk",
        fileName: basename(outputFileName),
        code: file.text
      })
    }
  }
}
