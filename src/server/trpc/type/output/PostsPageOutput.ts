import type {infer as Infer} from "zod"

import {createPageOutput} from "server/trpc/helper/createPageOutput"

import {PostsPageInput} from "server/trpc/type/input/PostsPageInput"

import {PostOutput} from "./PostOutput"

export const PostsPageOutput = createPageOutput(
  PostOutput.omit({content: true}),

  PostsPageInput
)

export type TPostsPageOutput = Infer<typeof PostsPageOutput>
