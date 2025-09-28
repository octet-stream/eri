import {z} from "zod"

const isObject = (value: unknown): value is Record<PropertyKey, any> =>
  typeof value === "object" && value != null && !Array.isArray(value)

export const AnyObject: z.ZodType<Record<PropertyKey, any>> = z
  .any()
  .check(ctx => {
    if (!isObject(ctx.value)) {
      ctx.issues.push({
        code: "invalid_type",
        expected: "object",
        input: ctx.value
      })
    }
  })

export type IAnyObject = z.input<typeof AnyObject>

export type OAnyObject = z.output<typeof AnyObject>
