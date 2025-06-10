import {z} from "zod"

export const DatabaseUserPassword = z
  .string()
  .min(8)
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

export type IDatabaseUserPassword = z.input<typeof DatabaseUserPassword>

export type ODatabaseUserPassword = z.output<typeof DatabaseUserPassword>
