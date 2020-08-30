import cookie from "cookie-parser"
import nc from "next-connect"

import onError from "server/middleware/errorHandler"
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
async function sendToken(req, res) {
  res.send(JSON.stringify({csrfToken: req.csrfToken()}))
}

const handler = nc({onError})
  .use(cors)
  .use(cookie())
  .use(csrf)
  .use(sendToken)

export default handler
