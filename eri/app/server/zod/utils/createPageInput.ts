import {z} from "zod"

import type {MaybeNull} from "../../../lib/types/MaybeNull.js"

import {PageArgs} from "./PageArgs.js"

export interface CreatePageInputOptions {
  maxLimit?: MaybeNull<number>
}

const defaults: Required<CreatePageInputOptions> = {
  maxLimit: null
}

type PageOutput<T extends z.ZodRawShape = never> = [T] extends [never]
  ? {args: PageArgs}
  : {args: PageArgs} & z.output<z.ZodObject<T>>

/**
 * Creates PageInput type with given `maxLimit` option
 */
export function createPageInput<T extends z.ZodRawShape = never>(
  options?: CreatePageInputOptions,
  extensions?: z.ZodObject<T>
) {
  const {maxLimit} = {...defaults, ...options}

  const Current = z
    .union([z.number().int(), z.string().regex(/^-?[0-9]+$/)])
    .optional()
    .transform(value => (value == null ? undefined : Number(value)))

  const LimitBase = z.number().int().positive()

  const Limit = maxLimit ? LimitBase.max(maxLimit).default(maxLimit) : LimitBase

  const PageBaseInput = z
    .object({current: Current, limit: Limit.optional()})
    .default(maxLimit ? {limit: maxLimit} : {})

  const PageInput = extensions
    ? z.intersection(extensions, PageBaseInput)
    : PageBaseInput

  return PageInput.optional().transform(input => {
    const {current, limit, ...fields} = input || {}

    const args = new PageArgs({current, limit, maxLimit})

    return {...fields, args} as PageOutput<T>
  })
}

/**
 * Page input type with max `limit` and its default value set to `50`
 */
export const DefaultPageInput = createPageInput({maxLimit: 50})

export type IDefaultPageInput = z.input<typeof DefaultPageInput>

export type ODefaultPageInput = z.output<typeof DefaultPageInput>
