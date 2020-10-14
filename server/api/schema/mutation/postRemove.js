import {GraphQLNonNull as Required, GraphQLInt as TInt} from "graphql"

import remove from "server/api/resolve/mutation/post/remove"

/**
 * @const field
 *
 * @type {import("graphql").GraphQLFieldConfigMap}
 */
const field = {
  type: new Required(TInt),
  resolve: remove,
  args: {
    id: {
      type: new Required(TInt)
    }
  }
}

export default field
