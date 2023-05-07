import type {NextApiRequest} from "next"
import {NextRequest} from "next/server"
import {getToken} from "next-auth/jwt"
import {TRPCError} from "@trpc/server"

import {COOKIE_NAME_SESSION} from "app/api/auth/[...nextauth]/route"

import {getORM} from "server/lib/db/orm"
import {User} from "server/db/entity"

import {withFetchCotext} from "./withFetchCotext"

/**
 * Attempts to parse cookies from Headers "cookie" header using NextRequest class.
 */
function getCookies(request: NextRequest): Record<string, string> {
  const cookies = request.cookies.getAll().map(({name, value}) => [name, value])

  return Object.fromEntries(cookies)
}

export const withAuthorization = withFetchCotext.unstable_pipe(
  async ({ctx, next}) => {
    // Get token from cookies. Patch `req` to get this function work with fetch.Headers
    const token = await getToken({
      cookieName: COOKIE_NAME_SESSION,
      req: {
        cookies: getCookies(ctx.req),
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
