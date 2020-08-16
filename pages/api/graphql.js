import {ApolloServer} from "apollo-server-micro"

import schema from "server/api/schema"

const server = new ApolloServer({schema, context: ctx => ctx})

export const config = {
  api: {
    bodyParser: false
  }
}

export default server.createHandler({path: "/api/graphql"})
