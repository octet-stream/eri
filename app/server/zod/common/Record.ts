import type {z} from "zod"

import {CommonDates} from "./CommonDates.js"
import {Node} from "./Node.js"

export const Record = Node.merge(CommonDates)

export type IRecord = z.input<typeof Record>

export type ORecord = z.output<typeof Record>
