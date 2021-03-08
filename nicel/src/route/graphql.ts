import {ApolloServer} from "apollo-server-koa"

import Router from "@koa/router"

import cors from "middleware/cors"
import session from "middleware/session"
import multipart from "middleware/multipart"

import schema from "api/schema"

const server = new ApolloServer({schema, uploads: false, context: ctx => ctx})

const path = "/api/graphql"

const router = new Router({prefix: path})

router
  .use(cors)
  .use(session)
  .use(multipart)
  .use(server.getMiddleware({path, cors: false}))

export default router
