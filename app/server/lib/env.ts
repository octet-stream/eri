import {resolve} from "node:path"

// @ts-expect-error Allow to override this readonly property here
process.env.NODE_ENV ||= "development"

function loadEnv(path: string): boolean {
  try {
    process.loadEnvFile(resolve(path))

    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      console.info("Unable to find find env file at %s", resolve(path))

      return false
    }

    throw error
  }
}

const env = process.env.NODE_ENV
const sources = [`.env.${env}.local`, `.env.${env}`, ".env.local", ".env"] as const

const loadedAny = sources.some(source => loadEnv(source))
if (!loadedAny) {
  console.info("No .env files found. Fallback to process.env object.")
}
