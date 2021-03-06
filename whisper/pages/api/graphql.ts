import {ApolloServer} from "apollo-server-micro"
import {PageConfig} from "next"

import nc from "next-connect"

import cors from "server/middleware/cors"
import session from "server/middleware/session"
import multipart from "server/middleware/multipart"
import database from "server/middleware/database"

import schema from "server/api/schema"

const server = new ApolloServer({schema, uploads: false, context: ctx => ctx})

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}

const handler = nc()
  .use(cors)
  .use(session)
  .use(multipart)
  .use(database)
  .use(server.createHandler({path: "/api/graphql"}))

export default handler
