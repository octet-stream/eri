import {$} from "execa"

import {isDevContainer} from "../../utils/isDevContainer.js"

async function setup() {
  // Skip docker compose setup and point to local database instead
  if (isDevContainer()) {
    return
  }

  // Setting up global env variables. All read-only complaints should be ignored by TypeScript
  // @ts-expect-error
  process.env.DB_HOST = "localhost"
  // @ts-expect-error
  process.env.DB_PORT = "3308"

  await $`docker compose --env-file .env.test.local -f compose.test.yaml up --wait --build`

  return async function teardown() {
    await $`docker compose --env-file .env.test.local -f compose.test.yaml down`
  }
}

export default setup
