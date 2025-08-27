import {csrf} from "hono/csrf"
import {unstable_RouterContextProvider as RouterContextProvider} from "react-router"
import {createHonoServer} from "react-router-hono-server/node"
import {authContext} from "./server/contexts/auth.js"
import {matchesContext} from "./server/contexts/matches.js"
import {ormContext} from "./server/contexts/orm.js"
import {resHeadersContext} from "./server/contexts/resHeaders.js"
import type {auth} from "./server/lib/auth/auth.js"
import config from "./server/lib/config.js"
import {orm} from "./server/lib/db/orm.js"
import {getRouteMatches} from "./server/lib/utils/routes.js"
import {withAuth} from "./server/middlewares/hono/withAuth.js"
import {withOrm} from "./server/middlewares/hono/withOrm.js"
import {withResponseHeaders} from "./server/middlewares/hono/withResponseHeaders.js"

export interface Variables {
  orm: typeof orm
  auth: typeof auth
  resHeaders: Headers
}

export interface Env {
  Variables: Variables
}

export default await createHonoServer<Env>({
  port: config.server.port,
  async configure(hono) {
    await orm.connect()

    hono
      .use(withResponseHeaders())
      .use(csrf()) // TODO: specify origin for production
      .use(withOrm())
      .use(withAuth())
  },

  async getLoadContext(ctx, options) {
    const context = new RouterContextProvider()

    context.set(authContext, ctx.var.auth)
    context.set(ormContext, ctx.var.orm)
    context.set(resHeadersContext, ctx.var.resHeaders)

    const matches = getRouteMatches(
      options.build.routes,
      ctx.req.url,
      options.build.basename
    )

    context.set(matchesContext, matches ?? [])

    return context
  },

  listeningListener: ({port}) =>
    console.log("🥕 Listening on http://localhost:%s", port)
})
