import {GraphQLObjectType as Output} from "graphql"

import postAdd from "./postAdd"

const TMutation = new Output({
  name: "Mutation",
  fields: {
    postAdd
  }
})

export default TMutation
