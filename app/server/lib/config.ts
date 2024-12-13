import "./env.js"

import {Config, type IConfig} from "./zod/Config.js"

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
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST || undefined,
    port: process.env.DB_PORT || undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
} satisfies IConfig)

export default config
