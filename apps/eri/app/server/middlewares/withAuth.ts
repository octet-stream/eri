import {createMiddleware} from "hono/factory"

import {User, Session} from "../db/entities.js"
import {parseCookie} from "../lib/auth/cookie.js"
import type {AuthContext} from "../lib/auth/Auth.js"
import {lucia} from "../lib/auth/lucia.js"
import {getOrm} from "../lib/db/orm.js"

export const withAuth = () =>
  createMiddleware(async (ctx, next) => {
    const sessionId = await parseCookie(ctx.req.header("cookie"))

    if (!sessionId) {
      return next()
    }

    const {user, session} = await lucia.validateSession(sessionId)

    if (!(user || session)) {
      return next()
    }

    const orm = await getOrm()

    const auth: AuthContext = {
      session: orm.em.getReference(Session, session.id),
      user: orm.em.getReference(User, user.id)
    }

    ctx.set("auth", auth)

    await next()
  })
