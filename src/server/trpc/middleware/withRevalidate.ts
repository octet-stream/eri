import got from "got"

import {middleware} from "server/trpc/def"

import {serverAddress} from "lib/util/serverAddress"
// import {revalidate} from "server/lib/util/revalidate"

const v4hosts = ["::1", "localhost", "127.0.0.1"]

/**
 * Adds `revalidate` function to the context
 */
export const withRevalidate = middleware(({ctx, next}) => {
  async function revalidateCaches(path: string) {
    // revalidate(path)

    if (process.env.NODE_ENV !== "test" && process.env.TEST_RUNNER !== "ava") {
      const url = new URL("/api/revalidate", serverAddress)

      url.search = `?${new URLSearchParams([["url", path]]).toString()}`

      await got.get(
        url,

        {
          dnsLookupIpVersion: v4hosts.includes(url.hostname) ? "ipv4" : "auto"
        }
      )
    }
  }

  return next({ctx: {...ctx, revalidate: revalidateCaches}})
})
