import {z} from "zod"

import {RecordSoft} from "../common/RecordSoft.js"

import {PostRecord} from "./PostRecord.js"

export const PostBaseOutput = PostRecord.extend({
  author: RecordSoft // TOOD: Add better validation for author
})

export type IPostBaseOutput = z.input<typeof PostBaseOutput>

export type OPostBaseOutput = z.output<typeof PostBaseOutput>
