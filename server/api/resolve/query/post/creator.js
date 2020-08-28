import Post from "server/model/Post"

/**
 * @typedef {import("server/model/User").default} User
 */

/**
 * @param {Post} post
 * @param {{postId?: number}} args
 *
 * @return {Promise<User>}
 */
async function getCreator(post, {postId}) {
  if (!post) {
    post = await Post.findByPk(postId)
  }

  if (!post.creator) {
    return post.getCreator()
  }

  return post.creator
}

export default getCreator
