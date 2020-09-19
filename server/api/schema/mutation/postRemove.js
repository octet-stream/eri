import {GraphQLNonNull as Required, GraphQLInt as TInt} from "graphql"

import update from "server/api/resolve/mutation/post/update"

/**
 * @const field
 *
 * @type {import("graphql").GraphQLFieldConfigMap}
 */
const field = {
  type: new Required(TInt),
  resolve: update,
  args: {
    postId: {
      type: new Required(TInt)
    }
  }
}

export default field
