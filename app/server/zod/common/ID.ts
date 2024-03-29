import {z} from "zod"

import {ID_LENGTH, ID_REGEX} from "../../lib/utils/id.js"

export const ID = z.string().length(ID_LENGTH).regex(ID_REGEX)

export type IID = z.input<typeof ID>

export type OID = z.output<typeof ID>
