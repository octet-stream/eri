import type {MiddlewareFunction, ProcedureParams} from "@trpc/server"
import {getToken} from "next-auth/jwt"
import {TRPCError} from "@trpc/server"

import {options} from "pages/api/auth/[...nextauth]"

import type {HttpContext, AuthContext} from "server/trpc/context"
import {getORM} from "server/lib/db/orm"
import {User} from "server/db/entity"

import {trpc} from "server/trpc/def"

const sessionOptions = options.cookies?.sessionToken

// FIXME: This might break anytime, need to find a better solution
type AuthMiddleware = MiddlewareFunction<
ProcedureParams<typeof trpc["_config"], HttpContext>,
ProcedureParams<typeof trpc["_config"], AuthContext>
>

export const withAuthorization: AuthMiddleware = async ({ctx, next}) => {
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
