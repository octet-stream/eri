import type {z} from "zod"

import {RecordSoft} from "../common/RecordSoft.ts"

import {PostBase} from "./PostBase.ts"

export const PostRecord = RecordSoft.merge(PostBase)

export type IPostRecord = z.output<typeof PostRecord>

export type OPostRecord = z.output<typeof PostRecord>
