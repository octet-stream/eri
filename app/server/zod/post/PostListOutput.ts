import type {z} from "zod"

import {createPageOutput} from "../utils/pagination/createPageOutput.js"

import {PostBaseOutput} from "./PostBaseOutput.js"

export const PostListOutput = createPageOutput(PostBaseOutput)

export type IPostListOutput = z.input<typeof PostListOutput>

export type OPostListOutput = z.output<typeof PostListOutput>
