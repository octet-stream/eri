import createError from "http-errors"
import nc from "next-connect"

import onError from "server/middleware/errorHandler"
import session from "server/middleware/session"
import client from "server/middleware/client"
import cors from "server/middleware/cors"

export const config = {
  api: {
    externalResolver: true
  }
}

async function logout(req, res) {
  if (!req.session.user) {
    throw createError(401)
  }

  await req.session.destroy()

  res.send(JSON.stringify({message: "OK", error: null}))
}

const handler = nc({onError})
  .use(cors)
  .use(session)
  .use(client)
  .use(logout)

export default handler
