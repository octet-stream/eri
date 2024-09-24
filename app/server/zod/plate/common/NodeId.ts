import {z} from "zod"

import {validate} from "uuid"

import {NODE_ID_EXPR} from "../utils/nodeId.js"

export const NodeId = z.string().superRefine((value, ctx) => {
  // Support UUIDs for backward compatibility
  if (
    !validate(value) &&
    !NODE_ID_EXPR.test(value) &&
    !/^[0-9]+$/.test(value)
  ) {
    ctx.addIssue({
      validation: "regex",
      code: z.ZodIssueCode.invalid_string,
      message:
        "Invalid id format. Must be either UUID or 5-symbol nanoid string"
    })
  }
})
