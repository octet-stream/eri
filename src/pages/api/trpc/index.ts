import {renderTrpcPanel} from "trpc-panel"
import type {NextApiHandler} from "next"

import got from "got"

import {router} from "server/trpc/router"

const base = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SERVER_URL

let cachedNotFoundResponse: string | undefined

const isLocalhost = (url: URL) => [
  "localhost",
  "127.0.0.1",
  "[::1]"
].includes(url.hostname)

async function get404Page(): Promise<string> {
  if (cachedNotFoundResponse) {
    return cachedNotFoundResponse
  }

  const url = new URL("/404", base)

  return got
    .get(url, {
      throwHttpErrors: false,
      dnsLookupIpVersion: isLocalhost(url) ? "ipv4" : undefined
    })
    .text()
}

const panelHandler: NextApiHandler<string> = async (_, res) => {
  // Disabled in production
  if (process.env.NODE_ENV !== "production") {
    return res.status(200).send(renderTrpcPanel(router, {
      url: new URL("/api/trpc", base).href,
      transformer: "superjson"
    }))
  }

  res.status(404).send(await get404Page())
}

export default panelHandler
