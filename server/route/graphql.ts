import {ApolloServer} from "apollo-server-micro"

import nc from "next-connect"

import cors from "server/middleware/cors"
import session from "server/middleware/session"
import multipart from "server/middleware/multipart"

import schema from "server/api/schema"

const server = new ApolloServer({schema, uploads: false, context: ctx => ctx})

const path = "/api/graphql"

const handler = nc()
  .use(cors)
  .use(session)
  .use(multipart)
  .use(path, server.createHandler({path}))

export default handler
