import {resolve} from "node:path"

import pc from "picocolors"

import {Env} from "./zod/Env.js"

// @ts-expect-error Allow to override this readonly property here
process.env.NODE_ENV = Env.parse(process.env.NODE_ENV)

function loadEnv(name: string): boolean {
  let hasFound = false

  const path = resolve(name)
  try {
    process.loadEnvFile(path)

    hasFound = true
  } catch (error) {
    const reason = error as NodeJS.ErrnoException
    if (!reason.code || reason.code !== "ENOENT") {
      throw error
    }
  } finally {
    const status = [!hasFound && "not", "found"].filter(Boolean).join(" ")
    const color = hasFound ? pc.green : pc.yellow

    console.log("Load env from %s (%s)", path, color(status))
  }

  return hasFound
}

const env = process.env.NODE_ENV
const sources = [
  `.env.${env}.local`,
  `.env.${env}`,
  ".env.local",
  ".env"
] as const

const loadedAny = sources.some(source => loadEnv(source))
if (!loadedAny) {
  console.info("No .env files found. Fallback to process.env object.")
}
