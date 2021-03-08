import {Middleware, DefaultState} from "koa"
import {parse} from "then-busboy"

import Context from "type/Context"

const methods = ["post"]

const multipart: Middleware<DefaultState, Context> = async (ctx, next) => {
  if (!methods.includes(ctx.method.toLocaleLowerCase())) {
    return next()
  }

  if (!ctx.is("multipart/form-data")) {
    return next()
  }

  const body = await parse(ctx.req)

  ctx.request.body = body.json()

  return next()
}

export default multipart
