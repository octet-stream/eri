import {z} from "zod"

export const DatabaseHost = z
  .union([
    z.literal("localhost"),
    z.string().ip(),
    z.string().url(),
    z
      .string()
      .min(3)
      .regex(/[a-z0-9_]{3,}/) // Loosen the validation a bit, for docker compose networks
  ])
  .default("localhost")

export type IDatabaseHost = z.input<typeof DatabaseHost>

export type ODatabaseHost = z.output<typeof DatabaseHost>
