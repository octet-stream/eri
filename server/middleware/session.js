import {parse} from "url"

import {session} from "next-session"

import Session from "server/model/Session"
import Store from "server/lib/auth/Store"

const middleware = session({
  name: "eri.sid",
  secret: process.env.AUTH_SESSION_SECRET,
  store: new Store(Session),
  cookie: {
    maxAge: 60000,
    sameSite: "lax",
    domain: parse(process.env.NEXT_PUBLIC_SERVER).hostname
  }
})

export default middleware
