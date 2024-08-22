import {z} from "zod"

const Secret = z.string().min(21)

export const Secrets = z
  .union([z.array(Secret).nonempty(), Secret])
  .transform(value => (Array.isArray(value) ? value : Array.of(value)))

export type ISecrets = z.input<typeof Secrets>

export type OSecrets = z.output<typeof Secrets>
