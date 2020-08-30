import parse from "ua-parser-js"

/**
 * @param {import("http").IncomingMessage} req
 *
 * @return {Promise<void>}
 */
async function client(req, res, next) {
  req.client = {
    ...parse(req.headers["user-agent"]), ip: req.socket.remoteAddress
  }

  return next()
}

export default client
