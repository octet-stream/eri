/* eslint-disable @typescript-eslint/indent */
import type {
  MiddlewareFunction
} from "@trpc/server/dist/declarations/src/internals/middlewares"
import {getToken} from "next-auth/jwt"
import {TRPCError} from "@trpc/server"

import type {GlobalContext, AuthContext} from "server/trpc/context"
import {isSSRContext} from "server/trpc/context"
import {User} from "server/db/entity"
import {getORM} from "server/lib/db"

type AuthMiddleware = MiddlewareFunction<GlobalContext, AuthContext, unknown>

const auth: AuthMiddleware = async ({ctx, next}) => {
  // TODO: Figure out the way to move it to separate middleware
  if (!isSSRContext(ctx)) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "SSRContext required for this operation"
    })
  }

  const session = await getToken({
    req: ctx.req,
    secret: process.env.NEXTAUTH_SECRET
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
