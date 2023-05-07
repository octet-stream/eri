import {parse, splitCookiesString} from "set-cookie-parser"
import type {NextApiRequest} from "next"
import {NextRequest} from "next/server"
import {getToken} from "next-auth/jwt"
import {TRPCError} from "@trpc/server"

import {COOKIE_NAME_SESSION} from "app/api/auth/[...nextauth]/route"

import {getORM} from "server/lib/db/orm"
import {User} from "server/db/entity"

import {withFetchCotext} from "./withFetchCotext"

const ignore = [
  "path",
  "expires",
  "maxAge",
  "domain",
  "secure",
  "httpOnly",
  "sameSite"
]

/**
 * Attempts to parse cookies from Headers "cookie" header.
 *
 * Hope next-auth one day will support Headers object out of the box
 */
function getCookies(request: Request | NextRequest): Record<string, string> {
  const cookies = parse(splitCookiesString(request.headers.get("cookie") ?? ""))

  const res: [string, string][] = []

  for (const {name, value, ...rest} of cookies) {
    res.push([name, value])

    for (const [k, v] of Object.entries(rest)) {
      if (!ignore.includes(k)) {
        res.push([String(k), String(v)])
      }
    }
  }

  return Object.fromEntries(res)
}

export const withAuthorization = withFetchCotext.unstable_pipe(
  async ({ctx, next}) => {
    const cookies = getCookies(ctx.req)

    // Get token from cookies. Patch `req` to get this function work with fetch.Headers
    const token = await getToken({
      cookieName: COOKIE_NAME_SESSION,
      req: {
        cookies,
        headers: ctx.req.headers
      } as unknown as NextApiRequest
    })

    if (!token) {
      throw new TRPCError({code: "UNAUTHORIZED"})
    }

    const orm = await getORM()

    const user = await orm.em.findOne(User, {id: token.sub})

    if (!user) {
      throw new TRPCError({code: "UNAUTHORIZED"})
    }

    return next({ctx: {...ctx, token, user}})
  }
)
