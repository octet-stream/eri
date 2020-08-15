import Post from "server/model/model/Post/Post"
import User from "server/model/model/server/User/User"

User.hasMany(Post)
Post.belongsTo(User)

export default Post
