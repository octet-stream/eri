import {parse} from "then-busboy"

import is from "type-is"

const methods = ["post"]

/**
 * @typedef {import("http").IncomingMessage} IncomingMessage
 * @typedef {import("http").OutgoingMessage} OutgoingMessage
 */

/**
 * @param {IncomingMessage} req
 * @param {OutgoingMessage} res
 * @param {(error?: Error) => Promise<void> | void} next
 */
async function multipart(req, res, next) {
  if (!methods.includes(req.method.toLocaleLowerCase())) {
    return next()
  }

  if (!is(req, "multipart/form-data")) {
    return next()
  }

  req.body = await parse(req)

  return next()
}

export default multipart
