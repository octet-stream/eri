import type {input, output} from "zod"

import {createPageOutput} from "server/trpc/helper/createPageOutput"

import {PostsPageInput} from "server/trpc/type/input/PostsPageInput"

import {PostBaseOutput} from "./PostBaseOutput"

export const PostsPageOutput = createPageOutput(PostBaseOutput, PostsPageInput)

export type IPostsPageOutput = input<typeof PostsPageOutput>

export type OPostsPageOutput = output<typeof PostsPageOutput>
