import type {infer as Infer} from "zod"
import {z} from "zod"

export const ID = z.string().uuid()

export type TID = Infer<typeof ID>
