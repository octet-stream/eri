import type {z} from "zod"

import {PostContent} from "../plate/editors/PostContent.js"

import {PostBaseOutput} from "./PostBaseOutput.js"

export const PostOutputBase = PostBaseOutput.extend({
  content: PostContent
})

export type IPostOutputBase = z.input<typeof PostOutputBase>

export type OPostOutputBase = z.output<typeof PostOutputBase>
