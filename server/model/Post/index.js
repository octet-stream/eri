import Post from "server/model/Post/Post"
import User from "server/model/User/User"

User.hasMany(Post)
Post.belongsTo(User)

export default Post
