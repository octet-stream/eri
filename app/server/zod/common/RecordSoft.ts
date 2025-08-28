import type {z} from "zod"

import {DateTime} from "./DateTime.ts"
import {Record} from "./Record.ts"

export const RecordSoft = Record.extend({
  removedAt: DateTime.nullable()
})

export type IRecordSoft = z.input<typeof RecordSoft>

export type ORecordSoft = z.output<typeof RecordSoft>
