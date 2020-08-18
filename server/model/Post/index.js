import Post from "server/model/Post/Post"
import User from "server/model/User/User"
import Tag from "server/model/Tag/Tag"
import PostsTags from "server/model/PostsTags"

User.hasMany(Post, {as: "posts"})
Post.belongsTo(User, {as: "creator", foreignKey: "userId"})

Post.belongsToMany(Tag, {through: PostsTags})
Tag.belongsToMany(Post, {through: PostsTags})

export default Post
