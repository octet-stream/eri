import {join} from "node:path"

import type {Plugin, ResolvedConfig} from "vite"
import {normalizePath} from "vite"

interface BuildMigrationsPLuginOptions {
  configEntry: string
  outputFileName?: string
}

const defaults: Required<Omit<BuildMigrationsPLuginOptions, "configEntry">> = {
  outputFileName: "mikro-orm.config.js"
}

/**
 * Bundles Mikro ORM config with migrations.
 *
 * Executes during `vite build`
 */
export default function buildMigrations(
  options: BuildMigrationsPLuginOptions
): Plugin {
  let config: ResolvedConfig | undefined

  const {configEntry, outputFileName} = {...defaults, ...options}

  return {
    name: "vite-plugin-eri-build-migrations",

    // Apply this plugin only for production ssr builds
    apply: ({build}, {command}) => !!(build?.ssr && command === "build"),

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    async buildStart() {
      if (!config) {
        return this.error("Can't run without resolved config")
      }

      this.emitFile({
        type: "chunk",
        fileName: outputFileName,
        id: normalizePath(join(config.root, configEntry))
      })
    }
  }
}
