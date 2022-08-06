import type {
  MiddlewareFunction
} from "@trpc/server/dist/declarations/src/internals/middlewares"
import {getToken} from "next-auth/jwt"
import {TRPCError} from "@trpc/server"

import {options} from "pages/api/auth/[...nextauth]"

import type {SSRContext, AuthContext} from "server/trpc/context"
import {User} from "server/db/entity"
import {getORM} from "server/lib/db"

type AuthMiddleware = MiddlewareFunction<SSRContext, AuthContext, unknown>

const sessionOptions = options.cookies?.sessionToken

const auth: AuthMiddleware = async ({ctx, next}) => {
  const session = await getToken({
    req: ctx.req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: sessionOptions?.name,
    secureCookie: sessionOptions?.options?.secure
  })

  if (!session) {
    throw new TRPCError({code: "UNAUTHORIZED"})
  }

  const orm = await getORM()

  const user = await orm.em.findOne(User, {id: session.sub})

  if (!user) {
    throw new TRPCError({code: "UNAUTHORIZED"})
  }

  return next({ctx: {...ctx, session, user}})
}

export default auth
