import {z} from "zod"

const pattern = /^[a-z0-9-_]+$/i

const message = `Invalid database name. The value must correspond following pattern: ${pattern.source}`

export const DatabaseName = z
  .string()
  .regex(pattern, message)
  .optional()
  .superRefine((value, ctx): value is NonNullable<typeof value> => {
    if (!value && process.env.NODE_ENV !== "test") {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: "string",
        received: "undefined",
        message: "Required"
      })
    }

    return z.NEVER
  })

export type IDatabaseName = z.input<typeof DatabaseName>

export type ODatabaseName = z.output<typeof DatabaseName>
