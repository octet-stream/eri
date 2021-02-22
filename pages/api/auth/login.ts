import {NextApiHandler, PageConfig} from "next"
import {Op as op} from "sequelize"

import createError from "http-errors"
import nc from "next-connect"

import add from "server/lib/auth/addSessionData"

import onError from "server/middleware/errorHandler"
import session from "server/middleware/session"
import client from "server/middleware/client"
import cors from "server/middleware/cors"

import User from "server/model/User"

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
}

const authenticate: NextApiHandler = async (req, res) => {
  const {username, password} = req.body

  const user = await User.findOne({
    where: {
      [op.or]: [
        {
          email: username
        },
        {
          login: username
        }
      ]
    }
  })

  if (!user) {
    throw createError(401)
  }

  if (!(await user.comparePassword(password))) {
    throw createError(401)
  }

  // @ts-ignore
  const {ip, browser, os} = req.client

  // Set session data
  // @ts-ignore
  add(req, {
    // @ts-ignore
    userId: user.id,
    clientIp: ip,
    clientBrowserName: browser.name,
    clientBrowserVersion: browser.version,
    clientOsName: os.name,
    clientOsVersion: os.version
  })

  res.json({success: true, error: null})
}

const handler = nc({onError})
  .use(cors)
  .use(session)
  .use(client)
  .use(authenticate)

export default handler
