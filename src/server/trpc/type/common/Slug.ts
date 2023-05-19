/* eslint-disable @typescript-eslint/indent */
import type {RefinementCtx} from "zod"
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

type FormattedSlugOutput = `${string}/${string}`

export const Slug = z
  .union([SlugObject, SlugTuple, SlugString])
  .transform<FormattedSlugOutput>(slug => {
    if (isString(slug)) {
      return slug as FormattedSlugOutput
    }

    if (isArray(slug)) {
      const [date, name] = slug

      return `${date}/${name}`
    }

    return `${slug.date}/${slug.name}`
  })

export type ISlug = z.input<typeof Slug>

export type OSlug = z.output<typeof Slug>
