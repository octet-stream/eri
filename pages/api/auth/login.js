import {parse} from "url"

import {session} from "next-session"

import nc from "next-connect"

import Session from "server/model/Session"
import Store from "server/lib/auth/Store"

export const config = {
  api: {
    externalResolver: true
  }
}

const handler = nc()
  .use(session({
    name: "eri.sid",
    secret: process.env.AUTH_SESSION_SECRET,
    store: new Store(Session),
    cookie: {
      maxAge: 60000,
      sameSite: "lax",
      domain: parse(process.env.NEXT_PUBLIC_SERVER).hostname
    }
  }))
  .use((req, res) => {
    // console.log(req.session)
    res.send(JSON.stringify({message: "OK"}))
  })

export default handler
