import {customAlphabet, urlAlphabet} from "nanoid"

import slugify from "@sindresorhus/slugify"
import isDate from "validator/lib/isDate"
import format from "date-fns/format"

import type {RawDate} from "lib/type/RawDate"
import {normalizeDate} from "lib/util/normalizeDate"

export const SLUG_DATE_FORMAT = "yyyy-MM-dd"

export const SLUG_NAME_VALID_REGEXPR = /^[a-z0-9-]+~[a-zA-Z0-9]{5}$/

export const isSlugDateValid = (date: string) => isDate(date, {
  format: SLUG_DATE_FORMAT.toUpperCase()
})

export const isSlugNameValid = (
  name: string
) => SLUG_NAME_VALID_REGEXPR.test(name)

/**
 * Creates a suffix for slug using nanoid
 */
export const createSlugSuffix = customAlphabet(
  urlAlphabet.replace(/[^a-z0-9]/gi, ""),

  5
)

const customReplacements: readonly [key: string, replacement: string][] = [
  [":", "colon"],
  [",", "comma"],
  [".", "period"],
  ["@", "at"]
].map(([key, replacement]) => [key, ` ${replacement} `])

/**
 * @param string a value to slugify
 */
export const createSlug = (string: string) => slugify(string, {
  customReplacements
})

export const formatSlug = (title: string, date: RawDate) => (
  `${
    format(normalizeDate(date), SLUG_DATE_FORMAT)
  }/${
    createSlug(title)
      .replace(/^-{1,}/, "") // Trim any "-" from the start
      .replace(/-{1,}$/, "") // Trim any "-" from the end
  }~${createSlugSuffix()}`
)
