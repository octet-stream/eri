import {ApolloServer} from "apollo-server-micro"

import nc from "next-connect"

import session from "server/middleware/session"
import multipart from "server/middleware/multipart"

import schema from "server/api/schema"

const server = new ApolloServer({schema, context: ctx => ctx})

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}

const handler = nc()
  .use(multipart)
  .use(session)
  .use(server.createHandler({path: "/api/graphql"}))

export default handler
