import {resolve} from "node:path"

// @ts-expect-error Allow to override this readonly property here
process.env.NODE_ENV ||= "development"

function loadEnv(path: string): boolean {
  try {
    process.loadEnvFile(resolve(path))

    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      console.info("Can't find env file at %s", resolve(path))

      return false
    }

    throw error
  }
}

const env = process.env.NODE_ENV
const sources = [`.env.${env}`, `.env.${env}.local`, ".env", ".env.local"] as const
for (const name of sources) {
  if (loadEnv(name)) {
    break
  }
}
