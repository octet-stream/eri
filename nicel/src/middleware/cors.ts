import cors from "@koa/cors"

const {SERVER_ADRESS, CLIENT_ADDRESS} = process.env

const allowed = [SERVER_ADRESS, CLIENT_ADDRESS]

const handler = cors({
  credentials: true,
  origin(ctx) {
    const origin = ctx.get("origin")
    if (allowed.includes(origin)) {
      return origin
    }

    return allowed[0]
  }
})

export default handler
