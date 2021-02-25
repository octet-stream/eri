import {IncomingMessage, ServerResponse} from "http"

import {parse} from "then-busboy"

import is from "type-is"

const methods = ["post"]

async function multipart(req: IncomingMessage, res: ServerResponse, next: (error?: Error) => Promise<void> | void) {
  if (!methods.includes(req.method.toLocaleLowerCase())) {
    return next()
  }

  if (!is(req, "multipart/form-data")) {
    return next()
  }

  // @ts-ignore
  req.body = await parse(req)

  return next()
}

export default multipart
