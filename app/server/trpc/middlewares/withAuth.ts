import {Session} from "lucia"

import {parseCookie, serializeCookie} from "../../lib/auth/cookie.js"
import {lucia} from "../../lib/auth/lucia.js"
import {User} from "../../db/entities.js"

import {withOrm} from "./withOrm.js"

export interface AuthContext {
  viewer: User
  session: Session
}

/**
 * Validates and refsreshes user session. Will return HTTP 401 status if no session found.
 */
export const withAuth = withOrm.unstable_pipe(async ({ctx, next, path}) => {
  const {req, resHeaders, orm} = ctx

  const cookies = req.headers.get("cookie")
  const sessionId = await parseCookie(cookies)

  // Throw Response with 401 status code if session cookie found or the cookie is invalid
  if (!sessionId) {
    throw new Response(null, {
      status: 401
    })
  }

  const {session, user} = await lucia.validateSession(sessionId)

  // Throw Response with 401 status code if we're unable to aquare eirher session or associated user
  if (!(session || user)) {
    throw new Response(null, {
      status: 401
    })
  }

  // Update cookie if the session has been refreshed
  if (session.fresh === true) {
    resHeaders.set("set-cookie", await serializeCookie(session.id))
  }

  // Get user reference, because lucia returns plain object as user
  const viewer = orm.em.getReference(User, user.id)

  const auth: AuthContext = {
    viewer,
    session
  }

  return next({ctx: {...ctx, auth}})
})
