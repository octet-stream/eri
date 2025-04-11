import {createServer} from "node:http"

export async function getRandomFreePort(): Promise<number> {
  const {promise, resolve, reject} = Promise.withResolvers<void>()

  const server = createServer(() => {})

  server.once("error", reject).listen(resolve)

  let port: number | undefined

  try {
    await promise

    const info = server.address()

    if (info && typeof info !== "string") {
      port = info.port
    }
  } finally {
    server.close()
  }

  if (!port) {
    throw new Error("Unable to obtain port")
  }

  return port
}
