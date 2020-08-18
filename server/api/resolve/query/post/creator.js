import Post from "server/model/Post"

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
