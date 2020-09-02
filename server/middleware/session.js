import {parse} from "url"

import {nanoid} from "nanoid"

import session from "express-session"
import ms from "ms"

import User from "server/model/User"
import Session from "server/model/Session"
import Store from "server/lib/auth/Store"

const middleware = session({
  genid: () => nanoid(),

  name: "eri.sid",
  saveUninitialized: false,
  secret: process.env.AUTH_SESSION_SECRET,
  store: new Store(Session, {
    as: "user",
    model: User,
    attributes: {
      exclude: ["password"]
    }
  }),
  cookie: {
    maxAge: ms("1y"),
    sameSite: "lax",
    domain: parse(process.env.NEXT_PUBLIC_SERVER).hostname
  }
})

export default middleware
