import normalize from "lib/helper/graphql/normalizeParams"
import getPageInfo from "lib/helper/graphql/getPageInfo"
import toPage from "lib/helper/graphql/toPage"
import db from "server/lib/db/connection"

import Post from "server/model/Post"

const where = {isDraft: false}

const include = ["creator", "tags"]

const getPosts = ({args}) => db.transaction(transaction => {
  const pageInfo = getPageInfo(args)

  return Post.findAndCountAll({...pageInfo, where, include, transaction})
    .then(toPage(pageInfo))
})

export default getPosts |> normalize
