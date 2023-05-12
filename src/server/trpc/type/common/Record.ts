import type {z} from "zod"

import {Node} from "./Node"
import {DateTime} from "./DateTime"

export const Record = Node.extend({
  createdAt: DateTime,
  updatedAt: DateTime
})

export type IRecord = z.input<typeof Record>

export type ORecord = z.output<typeof Record>
