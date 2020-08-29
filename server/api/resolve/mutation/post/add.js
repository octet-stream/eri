import normalize from "server/lib/helper/graphql/normalizeParams"
import db from "server/lib/db/connection"

import User from "server/model/User"
import Post from "server/model/Post"

const postAdd = ({args, ctx}) => db.transaction(async transaction => {
  const {user: viewer} = ctx.state
  const {post} = args

  const user = await User.findByPk(viewer.id, {transaction})

  return Post.create({...post, userId: user.id}, {transaction})
})

export default postAdd |> normalize
