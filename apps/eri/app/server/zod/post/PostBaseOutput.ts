import type {z} from "zod"

import {Record} from "../common/Record.js"

import {PostRecord} from "./PostRecord.js"

export const PostBaseOutput = PostRecord.extend({
  author: Record // TOOD: Add better validation for author
})

export type IPostBaseOutput = z.input<typeof PostBaseOutput>

export type OPostBaseOutput = z.output<typeof PostBaseOutput>
