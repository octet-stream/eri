import type {z} from "zod"

import {RecordSoft} from "../common/RecordSoft.js"

import {PostBase} from "./PostBase.js"

export const PostRecord = RecordSoft.merge(PostBase)

export type IPostRecord = z.output<typeof PostRecord>

export type OPostRecord = z.output<typeof PostRecord>
