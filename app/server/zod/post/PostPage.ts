import {createPage} from "../utils/pagination/createPage.ts"

import {PostListInput} from "./PostListInput.ts"
import {PostListOutput} from "./PostListOutput.ts"

export const PostPage = createPage({
  input: PostListInput,
  output: PostListOutput
})
