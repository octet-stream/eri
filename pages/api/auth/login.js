import nc from "next-connect"

import onError from "server/middleware/errorHandler"
import session from "server/middleware/session"
import csrf from "server/middleware/csrf"
import cors from "server/middleware/cors"

export const config = {
  api: {
    externalResolver: true
  }
}

/**
 * @param {import("http").IncomingMessage} req
 * @param {import("http").OutgoingMessage} res
 *
 * @return {void}
 */
async function authenticate(req, res) {
  res.send(JSON.stringify({message: "OK"}))
}

const handler = nc({onError})
  .use(cors)
  .use(session)
  .use(csrf)
  .use(authenticate)

export default handler
