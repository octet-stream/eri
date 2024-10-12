import {createPage} from "../utils/pagination/createPage.js"

import {PostListInput} from "./PostListInput.js"
import {PostListOutput} from "./PostListOutput.js"

export const PostPage = createPage({
  input: PostListInput,
  output: PostListOutput
})
