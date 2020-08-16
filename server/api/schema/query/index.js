import {GraphQLObjectType as Output} from "graphql"

import hello from "./hello"

const TQuery = new Output({
  name: "Query",
  fields: {
    hello
  }
})

export default TQuery
