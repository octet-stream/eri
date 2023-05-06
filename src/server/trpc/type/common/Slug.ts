import type {input, output, RefinementCtx} from "zod"
import {z, ZodIssueCode} from "zod"

import isString from "lodash/isString"

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
  z.string().nonempty().superRefine(validateDate),
  z.string().nonempty().superRefine(validateName)
])

export const SlugObject = z.object({
  date: z.string().nonempty().superRefine(validateDate),
  name: z.string().nonempty().superRefine(validateName)
})

export const SlugString = z.string().superRefine((slug, ctx) => {
  const [date, name] = slug.split("/")

  validateDate(date, ctx)
  validateName(name, ctx)
})

export const Slug = z
  .union([SlugObject, SlugTuple, SlugString])
  .transform(slug => {
    if (isString(slug)) {
      return slug
    }

    if (isArray(slug)) {
      return slug.join("/")
    }

    return `${slug.date}/${slug.name}`
  })

export type ISlug = input<typeof Slug>

export type OSlug = output<typeof Slug>
