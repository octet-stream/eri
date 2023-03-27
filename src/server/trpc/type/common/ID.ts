import type {input, output} from "zod"
import {z} from "zod"

export const ID = z.string().uuid()

export type IID = input<typeof ID>

export type OID = output<typeof ID>
