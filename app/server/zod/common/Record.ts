import {z} from "zod"

import {Node} from "./Node.js"
import {CommonDates} from "./CommonDates.js"

export const Record = Node.merge(CommonDates)

export type IRecord = z.input<typeof Record>

export type ORecord = z.output<typeof Record>
