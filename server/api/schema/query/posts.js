import {GraphQLNonNull as Required, GraphQLInt as TInt} from "graphql"

import TPostPage from "server/api/type/post/TPostPage"
import list from "server/api/resolve/query/post/list"

const field = {
  type: new Required(TPostPage),
  resolve: list,
  args: {
    page: {
      type: TInt
    }
  }
}

export default field
