import {ApolloServer} from "apollo-server-koa"

import Router from "@koa/router"

import schema from "api/schema"

const server = new ApolloServer({
  schema,
  uploads: false,

  context: ({ctx}) => ctx
})

const path = "/api/graphql"

const router = new Router()

const middleware = server.getMiddleware({cors: false, path})

router
  .get(path, middleware)
  .post(path, middleware)

export default router
