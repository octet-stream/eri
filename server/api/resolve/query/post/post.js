import normalize from "lib/helper/graphql/normalizeParams"
import db from "lib/db/connection"

import Post from "server/model/Post"
import User from "server/model/User"

const include = [User]

const getPost = ({args}) => db.transaction(async transaction => {
  const post = await Post.findBySlug(args.slug, {transaction, include})

  if (!post) {
    throw new Error("Can't find a post")
  }

  return post
})

export default getPost |> normalize
