import type {z} from "zod"

import {Port} from "../../common/Port.ts"

export const DatabasePort = Port.default(3306)

export type IDatabasePort = z.input<typeof DatabasePort>

export type ODatabasePort = z.output<typeof DatabasePort>
