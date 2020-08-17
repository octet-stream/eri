import {GraphQLObjectType as Output} from "graphql"

import post from "./post"

const TQuery = new Output({
  name: "Query",
  fields: {
    post
  }
})

export default TQuery
