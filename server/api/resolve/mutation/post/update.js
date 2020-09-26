import normalize from "server/lib/helper/graphql/normalizeParams"
import db from "server/lib/db/connection"

import Post from "server/model/Post"

import createPostAbilities from "server/acl/post"
import notFound from "server/error/post/notFound"
import forbidden from "server/error/post/forbidden"

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
 */

/**
 * Updates an existent post found by ID
 *
 * @param {Object} params
 * @param {{post: PostInput}} params.args
 * @param {{req: NextApiRequest, res: NextApiResponse}} params.ctx
 *
 * @return {Promise<Post>}
 */
const updatePost = ({args, ctx}) => db.transaction(async transaction => {
  const {id, ...fields} = args.post
  const {user} = ctx.req.session

  const acl = createPostAbilities(user)

  const post = await Post.findByPk(id, {transaction})

  if (!post) {
    throw notFound()
  }

  if (acl.cannot("update", post)) {
    throw forbidden("update")
  }

  return post.update(fields, {transaction})
    .then(() => post.reload({transaction}))
})

export default updatePost |> normalize
