import {
  type unstable_InitialContext as InitialContext,
  unstable_createContext as createContext
} from "react-router" // For `AppLoadContext` augmentation

import {createHonoServer} from "react-router-hono-server/node"

import type {Context} from "hono"
import {csrf} from "hono/csrf"

import {serverContext} from "./server/contexts/server.js"
import type {auth} from "./server/lib/auth/auth.js"
import {orm} from "./server/lib/db/orm.js"
import {withAuth} from "./server/middlewares/withAuth.js"
import {withOrm} from "./server/middlewares/withOrm.js"
import {withResponseHeaders} from "./server/middlewares/withResponseHeaders.js"

import config from "./server/lib/config.js"

export interface Variables {
  orm: typeof orm
  auth: typeof auth
  resHeaders: Headers
}

export interface Env {
  Variables: Variables
}

// For `AppLoadContext` augmentation
declare module "react-router" {
  interface AppLoadContext extends Readonly<Variables> {}

  interface LoaderFunctionArgs {
    context: AppLoadContext
  }

  interface ActionFunctionArgs {
    context: AppLoadContext
  }
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

  async getLoadContext(ctx: Context<Env>) {
    const initialContext: InitialContext = new Map([
      [
        serverContext,

        {
          auth: ctx.var.auth,
          orm: ctx.var.orm,
          resHeaders: ctx.var.resHeaders
        } satisfies Variables
      ]
    ])

    return initialContext
  },

  listeningListener: ({port}) =>
    console.log("🥕 Listening on http://localhost:%s", port)
})
