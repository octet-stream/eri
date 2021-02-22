import {NextApiHandler, PageConfig} from "next"

import createError from "http-errors"
import nc from "next-connect"

import onError from "server/middleware/errorHandler"
import session from "server/middleware/session"
import client from "server/middleware/client"
import cors from "server/middleware/cors"

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
}

const logout: NextApiHandler = async (req, res) => {
  // @ts-ignore
  if (!req.session.user) {
    throw createError(401)
  }

  // @ts-ignore
  await req.session.destroy()

  res.json({success: true, error: null})
}

const handler = nc({onError})
  .use(cors)
  .use(session)
  .use(client)
  .use(logout)

export default handler
