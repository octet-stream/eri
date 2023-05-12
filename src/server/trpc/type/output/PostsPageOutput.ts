import type {z} from "zod"

import {createPageOutput} from "server/trpc/helper/createPageOutput"

import {PostsPageInput} from "server/trpc/type/input/PostsPageInput"

import {PostBaseOutput} from "./PostBaseOutput"

export const PostsPageOutput = createPageOutput(PostBaseOutput, PostsPageInput)

export type IPostsPageOutput = z.input<typeof PostsPageOutput>

export type OPostsPageOutput = z.output<typeof PostsPageOutput>
