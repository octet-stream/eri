import type {NextApiRequest} from "next"
import {getToken} from "next-auth/jwt"
import {TRPCError} from "@trpc/server"

import {COOKIE_NAME_SESSION} from "app/api/auth/[...nextauth]/route"

import {getORM} from "server/lib/db/orm"
import {User} from "server/db/entity"

import {withFetchCotext} from "./withFetchCotext"

export const withAuthorization = withFetchCotext.unstable_pipe(
  async ({ctx, next}) => {
    const cookies = (ctx.req.headers as any)
      .getSetCookie() // TODO: Figure out how to get typings for this method
      .map((cookie: string) => cookie.split("="))

    // Get token from cookies. Patch `req` to get this function work with fetch.Headers
    const token = await getToken({
      cookieName: COOKIE_NAME_SESSION,
      req: {
        headers: ctx.req.headers,
        cookies: Object.fromEntries(cookies)
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
