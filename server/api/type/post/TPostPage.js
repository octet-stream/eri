import createPageType from "server/lib/helper/graphql/createPageType"
import TPost from "server/api/type/post/TPost"

const TPostPage = createPageType({
  type: [TPost, true],
  required: true,
})

export default TPostPage
