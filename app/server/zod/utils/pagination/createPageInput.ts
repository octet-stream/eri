import {z} from "zod"

import type {MaybeNull} from "../../../../lib/types/MaybeNull.js"

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

  const Page = z
    .union([z.string(), z.number()])
    .nullish()
    .pipe(
      z.coerce
        .number()
        .int()
        .positive("Page number must be greater or equal 1")
        .nullish()
        .transform(value => (value == null ? undefined : value))
    )

  const LimitBase = z.number().int().positive()

  const Limit = maxLimit ? LimitBase.max(maxLimit).default(maxLimit) : LimitBase

  const PageBaseInput = z
    .object({page: Page, limit: Limit.optional()})
    .default(maxLimit ? {limit: maxLimit} : {})

  const PageInput = extensions
    ? z.intersection(extensions, PageBaseInput)
    : PageBaseInput

  return PageInput.optional().transform(input => {
    const {page, limit, ...fields} = input || {}

    const args = new PageArgs({page, limit, maxLimit})

    return {...fields, args} as PageOutput<T>
  })
}

/**
 * Page input type with max `limit` and its default value set to `50`
 */
export const DefaultPageInput = createPageInput({maxLimit: 50})

export type IDefaultPageInput = z.input<typeof DefaultPageInput>

export type ODefaultPageInput = z.output<typeof DefaultPageInput>
