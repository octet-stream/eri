import type {input, output} from "zod"

import {EditorData} from "server/trpc/type/common/EditorData"

import {PostBaseOutput} from "./PostBaseOutput"

export const PostOutput = PostBaseOutput.extend({
  content: EditorData
})

export type IPostOutput = input<typeof PostOutput>

export type OPostOutput = output<typeof PostOutput>
