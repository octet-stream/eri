import {readFile} from "node:fs/promises"
import {resolve} from "node:path"
import {parseEnv} from "node:util"

import pc from "picocolors"

import {Env} from "./zod/Env.js"

// @ts-expect-error Allow to override this readonly property here
process.env.NODE_ENV = Env.parse(process.env.NODE_ENV)

async function loadEnv(name: string): Promise<boolean> {
  let hasFound = false

  const path = resolve(name)
  try {
    const envs = parseEnv(await readFile(path, "utf-8"))

    Object.entries(envs).forEach(([key, value]) => {
      if (
        !(key in process.env) ||
        (process.env.NODE_ENV === "test" && process.env.IN_NIX_SHELL)
      ) {
        process.env[key] = value
      }
    })

    hasFound = true
  } catch (error) {
    const reason = error as NodeJS.ErrnoException
    if (!reason.code || reason.code !== "ENOENT") {
      throw error
    }
  } finally {
    const status = [!hasFound && "not", "found"].filter(Boolean).join(" ")
    const color = hasFound ? pc.green : pc.yellow

    if (process.env.NODE_ENV !== "test") {
      console.log(`Load env from ${path} (${color(status)})`)
    }
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

let loadedAny = false
for (const source of sources) {
  if (await loadEnv(source)) {
    loadedAny = true
    break
  }
}

if (!loadedAny) {
  console.info("No .env files found. Fallback to process.env object.")
}
