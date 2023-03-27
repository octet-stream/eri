import type {input, output} from "zod"
import {z} from "zod"

import isDate from "validator/lib/isDate"

const {isArray} = Array

export const SLUG_REGEXP = /^[a-z0-9-]+-[a-zA-Z0-9]{5}$/

const isDateValid = (date: string) => isDate(date, {format: "YYYY-MM-DD"})

export const SlugTuple = z.tuple([
  z.string().refine(isDateValid),
  z.string().min(1).regex(SLUG_REGEXP)
])

// TODO: Rewrite with .superRefine
export const SlugString = z.string().refine(slug => {
  const [date, name] = slug.split("/")

  return isDateValid(date) && SLUG_REGEXP.test(name)
})

export const Slug = z
  .union([SlugTuple, SlugString])
  .transform(slug => isArray(slug) ? slug.join("/") : slug)

export type ISlug = input<typeof Slug>

export type OSlug = output<typeof Slug>
