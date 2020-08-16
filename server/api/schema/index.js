import {GraphQLSchema as Schema} from "graphql"

import TQuery from "server/api/schema/query"
import TMutation from "server/api/schema/mutation"

const schema = new Schema({
  query: TQuery,
  mutation: TMutation,
  // subscription: null,
})

export default schema
