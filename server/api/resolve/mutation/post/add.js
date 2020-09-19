import normalize from "server/lib/helper/graphql/normalizeParams"
import db from "server/lib/db/connection"

import Post from "server/model/Post"

/**
 * @typedef {import("next").NextApiRequest} NextApiRequest
 * @typedef {import("next").NextApiResponse} NextApiResponse
 */

/**
 * @typedef {Object} PostInput
 *
 * @prop {number} id
 * @prop {string} name
 * @prop {string} text
 * @prop {boolean} [isDraft = true]
 */

/**
 * Creates a new Post
 *
 * @param {Object} params
 * @param {{post: PostInput}} params.args
 * @param {{req: NextApiRequest, res: NextApiResponse}} params.ctx
 *
 * @return {Promise<Post>}
 */
const postAdd = ({args, ctx}) => db.transaction(async transaction => {
  const {user} = ctx.req.session
  const {post} = args

  return Post.create({...post, userId: user.id}, {transaction})
})

export default postAdd |> normalize
