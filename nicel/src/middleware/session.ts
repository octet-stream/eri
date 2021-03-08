import {URL} from "url"

import session from "koa-session-minimal"

import store from "koa-redis"
import ms from "ms"

import redis from "lib/auth/sessionStore"

const middleware = session({
  key: "eri.sid",
  store: store({client: redis}),
  cookie: {
    maxAge: ms("1y"),
    sameSite: "lax",
    domain: new URL(process.env.SERVER_ADDRESS).hostname,
    secure: true,
  }
})

export default middleware
