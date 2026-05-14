import {csrf} from "hono/csrf"
import {RouterContextProvider} from "react-router"
import {createHonoServer} from "react-router-hono-server/node"

import {authContext} from "#app/server/contexts/auth.ts"
import {matchesContext} from "#app/server/contexts/matches.ts"
import {ormContext} from "#app/server/contexts/orm.ts"
import {resHeadersContext} from "#app/server/contexts/resHeaders.ts"
import {type Auth, createAuth} from "#app/server/lib/auth/auth.ts"
import config from "#app/server/lib/config.ts"
import {createLibsqlConfig} from "#app/server/lib/db/configs/libsql.ts"
import {createOrm, type MikroOrmInstance} from "#app/server/lib/db/orm.ts"
import {getRouteMatches} from "#app/server/lib/utils/routes.ts"
import {withAuth} from "#app/server/middlewares/hono/withAuth.ts"
import {withOrm} from "#app/server/middlewares/hono/withOrm.ts"
import {withResponseHeaders} from "#app/server/middlewares/hono/withResponseHeaders.ts"

export interface Variables {
  orm: MikroOrmInstance
  auth: Auth
  resHeaders: Headers
}

export interface Env {
  Variables: Variables
}

export default await createHonoServer<Env>({
  port: config.server.port,
  async configure(hono) {
    const orm = await createOrm(createLibsqlConfig(config.orm))
    const auth = createAuth(orm)

    await orm.connect()

    hono
      .use(withResponseHeaders())
      .use(csrf()) // TODO: specify origin for production
      .use(withOrm(orm))
      .use(withAuth(auth))
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
