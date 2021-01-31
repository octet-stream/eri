import {Op as op} from "sequelize"

import createError from "http-errors"
import nc from "next-connect"

import add from "server/lib/auth/addSessionData"

import onError from "server/middleware/errorHandler"
import session from "server/middleware/session"
import client from "server/middleware/client"
import cors from "server/middleware/cors"

import User from "server/model/User"

export const config = {
  api: {
    externalResolver: true
  }
}

/**
 * @param {import("http").IncomingMessage} req
 * @param {import("http").OutgoingMessage} res
 *
 * @return {Promise<void>}
 */
async function authenticate(req, res) {
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

  const {ip, browser, os} = req.client

  // Set session data
  add(req, {
    userId: user.id,
    clientIp: ip,
    clientBrowserName: browser.name,
    clientBrowserVersion: browser.version,
    clientOsName: os.name,
    clientOsVersion: os.version
  })

  res.send(JSON.stringify({message: "OK", error: null}))
}

const handler = nc({onError})
  .use(cors)
  .use(session)
  .use(client)
  .use(authenticate)

export default handler
