import "reflect-metadata"
import "server/lib/config"

import {Server, createServer, RequestListener} from "http";

import next from "next"
import nc from "next-connect"

import {connect, disconnect} from "server/lib/db/connection"

import graphql from "server/route/graphql"

const app = next({dev: process.env.NODE_ENV !== "production"})
const handle = app.getRequestHandler()

let server: Server = null

;["SIGTERM", "SIGINT"].forEach(signal => process.on(signal, async () => {
  await disconnect()

  server.close()

  // TODO: Find out what prevents the server from stopping
  process.exit(0)
}))

app.prepare()
  .then(async () => {
    await connect() // Connect to the db

    const port = Number(process.env.SERVER_PORT)
    const compose = nc()

    compose.use(graphql)

    compose.use((req, res) => handle(req, res))

    // These two request handlers basicly the same, but TS doesn't approve this operation
    // So, I'll just cast `compose` to unknown and then to `RequestHandler`
    server = createServer(compose as unknown as RequestListener).listen(port)

    console.log(`Server started on http://localhost:${port}`)
  })
  .catch(error => {
    console.error(error)

    process.exit(1)
  })
