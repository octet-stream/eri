import {createHonoServer} from "react-router-hono-server/node"

import type {Context} from "hono"
import {csrf} from "hono/csrf"

import {orm} from "./server/lib/db/orm.js"
import {withAuth} from "./server/middlewares/withAuth.js"
import {withOrm} from "./server/middlewares/withOrm.js"
import type {auth} from "./server/lib/auth/auth.js"

import config from "./server/lib/config.js"

export interface Variables {
  orm: typeof orm
  auth: typeof auth
}

export default await createHonoServer<{
  Variables: Variables
}>({
  port: config.server.port,
  async configure(hono) {
    await orm.connect()

    hono
      .use(csrf()) // TODO: specify origin for production
      .use(withOrm())
      .use(withAuth())
  },

  async getLoadContext(ctx: Context<{Variables: Variables}>) {
    return {
      auth: ctx.var.auth,
      orm: ctx.var.orm
    }
  },

  listeningListener: ({port}) =>
    console.log("🥕 Listening on http://localhost:%s", port)
})
