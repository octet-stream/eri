import {ApolloServer} from "apollo-server-micro"

import schema from "lib/graphql/schema"

const server = new ApolloServer({schema})

export default server.createHandler()
