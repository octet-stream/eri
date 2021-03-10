import {ApolloServer} from "apollo-server-koa"

import Router from "@koa/router"

import cors from "middleware/cors"
import body from "middleware/body"
import multipart from "middleware/multipart"

import schema from "api/schema"

const server = new ApolloServer({
  schema,
  uploads: false,

  context: ({ctx}) => ctx
})

const path = "/api/graphql"

const router = new Router()

const middleware = server.getMiddleware({
  bodyParserConfig: false,
  cors: false,
  path
})

router
  .use(cors)
  .use(body)
  .use(multipart)
  .get(path, middleware)
  .post(path, middleware)

export default router
