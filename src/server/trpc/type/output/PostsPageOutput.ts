import type {infer as Infer} from "zod"

import {createPageOutput} from "./PageOutput"
import {PostOutput} from "./PostOutput"

export const PostsPageOutput = createPageOutput(PostOutput.omit({
  content: true
}))

export type TPostsPageOutput = Infer<typeof PostsPageOutput>
