import {createPage} from "../utils/pagination/createPage.js"

import {PostListOutput} from "./PostListOutput.js"
import {PostListInput} from "./PostListInput.js"

export const PostPage = createPage({
  input: PostListInput,
  output: PostListOutput
})
