import cors from "@koa/cors"

const {NEXT_PUBLIC_SERVER, NODE_ENV} = process.env

const handler = cors({
  origin: NODE_ENV === "production" ? NEXT_PUBLIC_SERVER : "*"
})

export default handler
