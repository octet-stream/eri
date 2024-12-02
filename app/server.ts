import {createHonoServer} from "react-router-hono-server/node"

import {csrf} from "hono/csrf"

import {Auth} from "./server/lib/auth/Auth.js"
import {getOrm} from "./server/lib/db/orm.js"
import {withAuth} from "./server/middlewares/withAuth.js"
import {withOrm} from "./server/middlewares/withOrm.js"

export default await createHonoServer({
  configure(hono) {
    hono
      .use(csrf()) // TODO: specify origin for production
      .use(withOrm())
      .use(withAuth())
  },

  async getLoadContext(ctx) {
    return {
      auth: new Auth(ctx),
      orm: await getOrm()
    }
  },

  listeningListener: ({port}) =>
    console.log("🥕 Listening on http://localhost:%s", port)
})
