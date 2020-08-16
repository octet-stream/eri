import {GraphQLNonNull as Required} from "graphql"

import TPost from "server/api/type/post/TPost"
import TPostAddInput from "server/api/input/post/TPostAddInput"
import add from "server/api/resolve/mutation/post/add"

/**
 * @const field
 *
 * @type {import("graphql").GraphQLFieldConfigMap}
 */
const field = {
  type: new Required(TPost),
  resolve: add,
  args: {
    post: {
      type: new Required(TPostAddInput)
    }
  }
}

export default field
