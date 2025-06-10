import {z} from "zod"

const isObject = (value: unknown): value is Record<PropertyKey, any> =>
  typeof value === "object" && value != null && !Array.isArray(value)

function getTypeName(value: unknown) {
  if (!isObject(value)) {
    return typeof value
  }

  return Object.prototype.toString.call(value).slice(8, -1)
}

export const AnyObject: z.ZodType<Record<PropertyKey, any>> = z
  .any()
  .superRefine((value, ctx) => {
    if (isObject(value)) {
      return z.NEVER
    }

    ctx.addIssue({
      code: z.ZodIssueCode.invalid_type,
      expected: "object",
      received: getTypeName(value) as any
    })
  })

export type IAnyObject = z.input<typeof AnyObject>

export type OAnyObject = z.output<typeof AnyObject>
