import {GraphQLObjectType as Output} from "graphql"

import post from "./post"
import posts from "./posts"

const TQuery = new Output({
  name: "Query",
  fields: {
    post,
    posts
  }
})

export default TQuery
