import {nanoid} from "nanoid"

import session from "express-session"
import createStore from "connect-redis"
import ms from "ms"

import redis from "server/lib/auth/sessionStore"

const Store = createStore(session)

const middleware = session({
  genid: () => nanoid(),

  name: "eri.sid",
  resave: false,
  saveUninitialized: false,
  secret: process.env.AUTH_SESSION_SECRET,
  store: new Store({client: redis}),
  cookie: {
    maxAge: ms("1y"),
    sameSite: "lax",
    domain: new URL(process.env.NEXT_PUBLIC_SERVER).hostname
  }
})

export default middleware
