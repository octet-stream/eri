import {z, ZodIssueCode} from "zod"

import got from "got"
import isAbsoluteUrl from "is-absolute-url"

import {serverAddress} from "lib/util/serverAddress"

const v4hosts = ["::1", "127.0.0.1", "localhost"]

const isV4Host = (
  value: string | URL
): boolean => v4hosts.includes(value instanceof URL ? value.hostname : value)

export const RevalidatePath = z.string()
  .superRefine((value, ctx) => {
    if (isAbsoluteUrl(value) || !value.startsWith("/")) {
      ctx.addIssue({
        code: ZodIssueCode.invalid_string,
        message: "Revalidate path must be revative and start with \"/\"",
        validation: "url"
      })
    }
  })

export const RevalidateParams = z.object({
  path: RevalidatePath
})

/**
 * Calls on `/api/revalidate` legacy API route to revalidate given `page` on demand.
 * Aims to replace the new Next.js' `revalidatePath` API, because is's broken for dynamic routes.
 *
 * @param path A path to revalidate. Must be revalive and start with `/`
 */
export async function legacyRevalidate(path: `/${string}`): Promise<void> {
  if (process.env.NODE_ENV === "test" && process.env.TEST_RUNNER === "ava") {
    return
  }

  const url = new URL("/api/revalidate", serverAddress)

  url.search = new URLSearchParams({
    path: encodeURIComponent(await RevalidatePath.parseAsync(path))
  } as z.input<typeof RevalidateParams>).toString()

  await got.get(url, {
    dnsLookupIpVersion: isV4Host(url) ? "ipv4" : undefined
  })
}
