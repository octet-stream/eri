import {createHonoServer} from "react-router-hono-server/node"

import {csrf} from "hono/csrf"

import {Auth} from "./server/lib/auth/Auth.js"
import {orm} from "./server/lib/db/orm.js"
import {withAuth} from "./server/middlewares/withAuth.js"
import {withOrm} from "./server/middlewares/withOrm.js"

import config from "./server/lib/config.js"

export default await createHonoServer({
  port: config.server.port,
  async configure(hono) {
    await orm.connect()

    hono
      .use(csrf()) // TODO: specify origin for production
      .use(withOrm())
      .use(withAuth())
  },

  async getLoadContext(ctx) {
    return {
      auth: new Auth(ctx),
      orm
    }
  },

  listeningListener: ({port}) =>
    console.log("🥕 Listening on http://localhost:%s", port)
})
