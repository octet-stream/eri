import type {z} from "zod"

import {createPageOutput} from "../utils/pagination/createPageOutput.ts"

import {PostBaseOutput} from "./PostBaseOutput.ts"

export const PostListOutput = createPageOutput(PostBaseOutput)

export type IPostListOutput = z.input<typeof PostListOutput>

export type OPostListOutput = z.output<typeof PostListOutput>
