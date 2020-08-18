import {Op as op} from "sequelize"

import normalize from "lib/helper/graphql/normalizeParams"
import db from "server/lib/db/connection"

import Post from "server/model/Post"
import User from "server/model/User"
import Tag from "server/model/Tag"
import PostsTags from "server/model/PostsTags"

const getPost = ({args}) => db.transaction(async transaction => {
  const {id, slug} = args

  const post = await Post.findOne({
    where: {[op.or]: [{id}, {slug}]},

    include: [User, {model: Tag, through: PostsTags}],
    transaction,
  })

  if (!post) {
    throw new Error("Can't find a post")
  }

  return post
})

export default getPost |> normalize
