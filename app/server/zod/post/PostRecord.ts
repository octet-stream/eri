import {z} from "zod"

import {RecordSoft} from "../common/RecordSoft.ts"

import {PostBase} from "./PostBase.ts"

export const PostRecord = z.object({
  ...RecordSoft.shape,
  ...PostBase.shape
})

export type IPostRecord = z.output<typeof PostRecord>

export type OPostRecord = z.output<typeof PostRecord>
