import {customAlphabet, urlAlphabet} from "nanoid"
import {format, toDate} from "date-fns"

import slugify from "@sindresorhus/slugify"

import validator from "validator"

import type {RawDate} from "../../../lib/types/RawDate.js"

export const SLUG_DATE_FORMAT = "yyyy-MM-dd"

export const SLUG_NAME_VALID_REGEXPR = /^[a-z0-9-]+~[a-zA-Z0-9]{5}$/

/**
 * Checks if given slug `date` string has valid format
 *
 * @param date Date string in format `[full year zerofill]-[month number zerofill]-[day number zerofill]`
 *
 * ```ts
 * import {isSlugDateValid} from "server/lib/util/slug"
 *
 * isSlugDateValid("2023-03-28")
 * // -> true
 *
 * isSlugDateValid("hello-horld~3u0tf")
 * // -> false
 *
 * isSlugDateValid("2023-03-28/hello-horld~3u0tf")
 * // -> false
 * ```
 */
export const isSlugDateValid = (
  date: string
): boolean => validator.isDate(date, {
  format: SLUG_DATE_FORMAT.toUpperCase()
})

/**
 * Checks if slug `name` has valid format.
 *
 * The `name` argument **must** include `suffix`.
 *
 * Valid format matches `SLUG_NAME_VALID_REGEXPR` regexp.
 *
 * @param name
 *
 * @example
 *
 * ```ts
 * import {isSlugNameValid} from "server/lib/util/slug"
 *
 * isSLugNameValid("hello-word~3u0tf")
 * // -> true
 *
 * isSlugNameValid("hello-world")
 * // -> false
 *
 * isSlugNameValid("2023-03-28/hello-horld~3u0tf")
 * // -> false
 * ```
 */
export const isSlugNameValid = (
  name: string
): boolean => SLUG_NAME_VALID_REGEXPR.test(name)

/**
 * Checks if given `slug` has valid format
 *
 * @param slug
 *
 * @example
 *
 * ```ts
 * import {isSlugValid} from "server/lib/util/slug"
 *
 * isSlugValid("2023-03-28/hello-horld~3u0tf")
 * // -> true
 *
 * isSlugValid("hello-horld~3u0tf")
 * // -> false
 *
 * isSlugValid("2023-03-28")
 * // -> false
 * ```
 */
export function isSlugValid(slug: string): boolean {
  const [date, name] = slug.split("/")

  return isSlugDateValid(date) && isSlugNameValid(name)
}

/**
 * Creates a suffix for slug using nanoid
 */
export const formatSlugSuffix = customAlphabet(
  urlAlphabet.replace(/[^a-z0-9]/gi, ""),

  5
)

/**
 * Formats slug `date` part
 *
 * @param date Raw date or datetime to format
 */
export const formatSlugDate = (date: RawDate) => format(date, SLUG_DATE_FORMAT)

const customReplacements: readonly [key: string, replacement: string][] = [
  [":", "colon"],
  [",", "comma"],
  [".", "period"],
  ["@", "at"]
].map(([key, replacement]) => [key, ` ${replacement} `])

/**
 * Formats slug `name` part
 *
 * @param name a value to slugify
 */
export const formatSlugName = (name: string): string => (
  slugify(name, {customReplacements})
    .replace(/^-{1,}/, "") // Trim any "-" from the start
    .replace(/-{1,}$/, "") // Trim any "-" from the end
)

/**
 * Formats a `name` then adds it to the `base` string.
 */
const withName = (
  name: string,
  base: string
) => `${base}/${formatSlugName(name)}`

/**
 * Adds suffix to given base
 */
const withSuffix = (base: string) => `${base}~${formatSlugSuffix()}`

/**
 * Formats slug from given `name` and `date`.
 *
 * ```ts
 * import {formatSlug} from "server/lib/util/slug"
 *
 * formatSlug("hello-world", "2023-03-28T14:56:53.702Z")
 * // -> 2023-03-28/hello-world~3u0tf
 * ```
 */
export const formatSlug = (
  name: string,
  date: RawDate
) => withSuffix(withName(name, format(toDate(date), SLUG_DATE_FORMAT)))
