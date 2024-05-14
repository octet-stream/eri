import {z} from "zod"

import {PostContent} from "../plate/editors/PostContent.js"

import {PostBaseOutput} from "./PostBaseOutput.js"

export const PostOutput = PostBaseOutput.extend({
  content: PostContent
})

export type IPostOutput = z.input<typeof PostOutput>

export type OPostOutput = z.output<typeof PostOutput>
