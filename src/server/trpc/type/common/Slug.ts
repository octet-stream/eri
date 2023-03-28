import type {input, output, RefinementCtx} from "zod"
import {z, ZodIssueCode} from "zod"

import {
  isSlugNameValid,
  isSlugDateValid
} from "server/lib/util/slug"

const {isArray} = Array

function validateDate(value: string, ctx: RefinementCtx): void {
  if (!isSlugDateValid(value)) {
    ctx.addIssue({
      code: ZodIssueCode.invalid_string,
      message: "Invalid date format.",
      validation: "datetime"
    })
  }
}

function validateName(value: string, ctx: RefinementCtx): void {
  if (!isSlugNameValid(value)) {
    ctx.addIssue({
      code: ZodIssueCode.invalid_string,
      message: "Invalid slug name format",
      validation: "regex"
    })
  }
}

export const SlugTuple = z.tuple([
  z.string().superRefine(validateDate),
  z.string().min(1).superRefine(validateName)
])

export const SlugString = z.string().superRefine((slug, ctx) => {
  const [date, name] = slug.split("/")

  validateDate(date, ctx)
  validateName(name, ctx)
})

export const Slug = z
  .union([SlugTuple, SlugString])
  .transform(slug => isArray(slug) ? slug.join("/") : slug)

export type ISlug = input<typeof Slug>

export type OSlug = output<typeof Slug>
