import normalize from "server/lib/helper/graphql/normalizeParams"
import db from "server/lib/db/connection"

import Post from "server/model/Post"

import forbidden from "server/error/post/forbidden"
import notFound from "server/error/post/notFound"
import createPostAbilities from "server/acl/post"

/**
 * @typedef {import("next").NextApiRequest} NextApiRequest
 * @typedef {import("next").NextApiResponse} NextApiResponse
 */

/**
 * Removes a Post with given ID
 *
 * @param {Object} params
 * @param {{id: number}} params.args
 * @param {{req: NextApiRequest, res: NextApiResponse}} params.ctx
 *
 * @return {Promise<number>}
 */
const removePost = ({args, ctx}) => db.transaction(async transaction => {
  const {user} = ctx.req.session
  const {id} = args

  const acl = createPostAbilities(user)

  const post = await Post.findByPk(id, {transaction})

  if (!post) {
    throw notFound()
  }

  if (acl.cannot("delete", post)) {
    throw forbidden("delete")
  }

  return post.destroy({transaction}).then(() => post.id)
})

export default removePost |> normalize
