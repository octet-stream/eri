import "reflect-metadata"
import "lib/config"

import {Server} from "http";

import Koa from "koa"
import Router from "@koa/router"

import {connect, disconnect} from "lib/db/connection"

import errorHandler from "middleware/errorHandler"
import multipart from "middleware/multipart"
import session from "middleware/session"
import cors from "middleware/cors"

import graphql from "route/graphql"

let server: Server = null

;["SIGTERM", "SIGINT"].forEach(signal => process.on(signal, async () => {
  await disconnect()

  server.close()

  // TODO: Find out what prevents the server from stopping
  process.exit(0)
}))

async function main() {
  const port = Number(process.env.SERVER_PORT) ?? 3000

  const koa = new Koa()
  const router = new Router()

  koa.proxy = process.env.SERVER_TRUST_PROXY === "true"

  koa.keys = [process.env.AUTH_SESSION_SECRET]

  await connect() // Connect to the database

  router
    .use(graphql.allowedMethods())
    .use(graphql.routes())

  server = koa
    .use(errorHandler)
    .use(cors)
    .use(session)
    .use(multipart)
    .use(router.allowedMethods())
    .use(router.routes())
    .listen(port)

  console.log(`Server started on http://localhost:${port}`)
  console.log(`GraphQL Playground http://localhost:${port}/api/graphql`)
}

main().catch((error: Error) => {
  console.error(error)

  process.exit(1)
})
