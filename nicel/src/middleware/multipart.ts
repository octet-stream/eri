import {Middleware} from "koa"
import {parse} from "then-busboy"

const methods = ["post"]

const multipart: Middleware = async (ctx, next) => {
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
