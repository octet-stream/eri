import {z} from "zod"

export const ID = z.string().uuid()

export type IID = z.input<typeof ID>

export type OID = z.output<typeof ID>
