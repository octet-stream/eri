import Post from "model/Post/Post"
import User from "model/User/User"

User.hasMany(Post)
Post.belongsTo(User)

export default Post
