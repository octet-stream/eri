import {Middleware} from "koa"

const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.status ?? 500
    ctx.body = error.message || "Internal Server Error"
  }
}

export default errorHandler
