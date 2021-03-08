import PagePayload from "type/api/PagePayload"
import Post from "type/Post"

interface PostsPayload {
  posts: PagePayload<Post>
}

export default PostsPayload
