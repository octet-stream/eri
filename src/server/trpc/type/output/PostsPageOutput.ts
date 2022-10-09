import {createPageOutput} from "./PageOutput"
import {PostOutput} from "./PostOutput"

export const PostsPageOutput = createPageOutput(PostOutput.omit({
  content: true
}))
