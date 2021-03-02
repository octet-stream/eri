import {parse} from "then-busboy"

import is from "type-is"

import Middleware from "../type/Middleware"

const methods = ["post"]

const multipart: Middleware = async (req, _, next) => {
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
