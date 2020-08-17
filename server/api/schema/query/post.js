import {
  GraphQLNonNull as Required,
  GraphQLString as TString
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
      type: new Required(TString)
    }
  }
}

export default field
