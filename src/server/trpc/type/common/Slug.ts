import {z} from "zod"

import isDate from "validator/lib/isDate"

const SLUG_REGEXP = /^[a-z0-9-]+$/i

const isDateValid = (date: string) => isDate(date, {format: "YYYY-MM-DD"})

export const SlugTuple = z.tuple([
  z.string().refine(isDateValid),
  z.string().min(1).regex(SLUG_REGEXP)
])

export const SlugString = z.string().refine(slug => {
  const [date, name] = slug.split("/")

  return isDateValid(date) && SLUG_REGEXP.test(name)
})

export const Slug = z.union([SlugTuple, SlugString])
