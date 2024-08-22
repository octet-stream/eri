import {z} from "zod"

export const Port = z.union([z.number(), z.string().trim()]).pipe(
  z.coerce
    .number()
    .min(1) // Including reserved, just in case
    .max(2 ** 16 - 1) // 65635
)

export type IPort = z.input<typeof Port>

export type OPort = z.output<typeof Port>
