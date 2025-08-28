import type {z} from "zod"

import {CommonDates} from "./CommonDates.ts"
import {Node} from "./Node.ts"

export const Record = Node.merge(CommonDates)

export type IRecord = z.input<typeof Record>

export type ORecord = z.output<typeof Record>
