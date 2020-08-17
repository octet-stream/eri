import {
  GraphQLNonNull as Required,
  GraphQLString as TString,
  GraphQLInt as TInt
} from "graphql"

import TPost from "server/api/type/post/TPost"
import post from "server/api/resolve/query/post"

/**
 * @const field
 *
 * @type {import("graphql").GraphQLFieldConfigMap}
 */
const field = {
  type: new Required(TPost),
  resolve: post,
  args: {
    slug: {
      type: TString
    },
    id: {
      type: TInt
    }
  }
}

export default field
