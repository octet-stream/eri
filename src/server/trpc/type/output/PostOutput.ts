import type {z} from "zod"

import {EditorData} from "server/trpc/type/common/EditorData"

import {PostBaseOutput} from "./PostBaseOutput"

export const PostOutput = PostBaseOutput.extend({
  content: EditorData
})

export type IPostOutput = z.input<typeof PostOutput>

export type OPostOutput = z.output<typeof PostOutput>
