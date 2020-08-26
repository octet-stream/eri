import {parse} from "url"

import {session} from "next-session"

import nc from "next-connect"

export const config = {
  api: {
    externalResolver: true
  }
}

const handler = nc()
  .use(session({
    name: "eri.sid",
    secret: process.env.AUTH_SESSION_SECRET,
    cookie: {
      maxAge: 60000,
      sameSite: "lax",
      domain: parse(process.env.NEXT_PUBLIC_SERVER).hostname
    }
  }))
  .use((req, res) => {
    console.log(req.session)
    res.send(JSON.stringify({message: "OK"}))
  })

export default handler
