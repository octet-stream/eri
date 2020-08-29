import omit from "lodash/omitBy"
import isNil from "lodash/isNil"
import isEmpty from "lodash/isEmpty"

import normalize from "server/lib/helper/graphql/normalizeParams"
import db from "server/lib/db/connection"

import Post from "server/model/Post"

const getPost = ({args}) => db.transaction(async transaction => {
  const where = omit(args, isNil)

  if (isEmpty(where)) {
    throw new Error("The ID or slug param must be present to find a post")
  }

  const post = await Post.findOne({
    include: ["creator", "tags"],

    where,
    transaction,
  })

  if (!post) {
    throw new Error("Can't find a post")
  }

  return post
})

export default getPost |> normalize
