import {GraphQLNonNull as Required} from "graphql"

import TPost from "server/api/type/post/TPost"
import TPostUpdateInput from "server/api/input/post/TPostUpdateInput"
import update from "server/api/resolve/mutation/post/update"

/**
 * @const field
 *
 * @type {import("graphql").GraphQLFieldConfigMap}
 */
const field = {
  type: new Required(TPost),
  resolve: update,
  args: {
    post: {
      type: new Required(TPostUpdateInput)
    }
  }
}

export default field
