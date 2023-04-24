import {renderTrpcPanel} from "trpc-panel"
import type {NextApiHandler} from "next"

import got from "got"

import {router} from "server/trpc/router"

const base = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SERVER_URL

let cachedNotFoundResponse: string | undefined

const panelHanlder: NextApiHandler = async (_, res) => {
  // Disabled in production
  if (process.env.NODE_ENV !== "production") {
    return res.status(200).send(renderTrpcPanel(router, {
      url: new URL("/api/trpc", base).href
    }))
  }

  if (!cachedNotFoundResponse) {
    cachedNotFoundResponse = await got
      .get(new URL("/404", base).href, {
        throwHttpErrors: false,
        dnsLookupIpVersion: "ipv4"
      })
      .text()
  }

  res.status(404).send(cachedNotFoundResponse)
}

export default panelHanlder
