import {$} from "execa"

import {isDevContainer} from "../utils/isDevContainer.ts"

async function setup() {
  // Skip docker compose setup and point to local database instead
  if (isDevContainer()) {
    return
  }

  // Setting up global env variables. All read-only complaints should be ignored by TypeScript
  // @ts-expect-error
  process.env.DB_HOST = "localhost"
  // @ts-expect-error
  process.env.DB_PORT = "3308" // TODO: Use random port

  Reflect.deleteProperty(process.env, "DB_PASSWORD")

  await $`docker compose --env-file .env.test.local -f compose.test.yaml up --wait --build`

  return async function teardown() {
    await $`docker compose --env-file .env.test.local -f compose.test.yaml down`
  }
}

export default setup
