import Post from "server/model/Post/Post"
import User from "server/model/User/User"
import Tag from "server/model/Tag/Tag"
import PostsTags from "server/model/PostsTags"

Post.belongsTo(User, {as: "creator", foreignKey: "userId"})

Post.belongsToMany(Tag, {
  through: PostsTags,
  as: "tags",
  foreignKey: "postId"
})

Tag.belongsToMany(Post, {
  through: PostsTags,
  as: "posts",
  foreignKey: "tagId"
})

export default Post
