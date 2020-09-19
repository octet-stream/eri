import {GraphQLObjectType as Output} from "graphql"

import postAdd from "./postAdd"
import postUpdate from "./postUpdate"
import postRemove from "./postRemove"

const TMutation = new Output({
  name: "Mutation",
  fields: {
    postAdd,
    postUpdate,
    postRemove
  }
})

export default TMutation
