import {z} from "zod"

import {createPageOutput} from "../utils/createPageOutput.js"

import {PostListInput} from "./PostListInput.js"
import {PostBaseOutput} from "./PostBaseOutput.js"

export const PostListOutput = createPageOutput(PostBaseOutput, PostListInput)

export type IPostListOutput = z.input<typeof PostListOutput>

export type OPostListOutput = z.output<typeof PostListOutput>
