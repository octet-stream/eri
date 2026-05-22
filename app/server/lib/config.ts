import "./env.js"

import {Config, type IConfig} from "./zod/Config.ts"

const config = Config.parse({
  app: {
    name: process.env.BLOG_NAME
  },
  auth: {
    secret: process.env.AUTH_SECRET,
    cookiePrefix: process.env.AUTH_COOKIE_PREFIX || undefined
  },
  server: {
    port: process.env.PORT || undefined
  },
  orm: {
    debug: process.env.NODE_ENV,
    connection: {
      dbName: process.env.LIBSQL_DB_NAME || process.env.LIBSQL_DB_URL,
      password: process.env.LIBSQL_DB_PASSWORD
    }
  }
} satisfies IConfig)

export default config
