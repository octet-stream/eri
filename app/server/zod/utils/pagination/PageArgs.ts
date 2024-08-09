import type {MaybeUndefined} from "../../../../lib/types/MaybeUndefined.js"
import type {MaybeNull} from "../../../../lib/types/MaybeNull.js"

export interface PageArgsInput {
  /**
   * The number of the current page.
   */
  page?: number

  /**
   * The items limmit per page.
   */
  limit?: number

  /**
   * The max limit of the items for this page type.
   *
   * Unlike the others args, this field is borrowed from the `createPageInput()` helper.
   */
  maxLimit?: MaybeNull<number>
}

export class PageArgs implements PageArgsInput {
  readonly #current: number

  readonly #limit: MaybeUndefined<number>

  readonly #maxLimit: MaybeNull<number>

  readonly #offset: MaybeUndefined<number>

  constructor(input: PageArgsInput = {}) {
    let {page, limit, maxLimit} = input

    maxLimit ??= null
    page ??= 1

    // Defaults to the same value as maxLimit
    if (!limit && maxLimit != null) {
      limit = maxLimit
    }

    this.#limit = limit
    this.#current = page
    this.#maxLimit = maxLimit
    this.#offset = limit ? limit * (page - 1) : undefined
  }

  get offset(): MaybeUndefined<number> {
    return this.#offset
  }

  get current(): number {
    return this.#current
  }

  get limit(): MaybeUndefined<number> {
    return this.#limit
  }

  get maxLimit(): MaybeNull<number> {
    return this.#maxLimit
  }

  /**
   * Returns the number of the next page.
   * Will return `null` once you reach the last page.
   *
   * @param pages Total amount of pages
   */
  getNextPageNumber(pages: number): MaybeNull<number> {
    return pages > 1 && this.current < pages ? this.current + 1 : null
  }

  /**
   * Returns the number of the previous page.
   * Will be `null` once you're on the first page.
   */
  getPrevPageNumber(): MaybeNull<number> {
    return this.current > 1 ? this.current - 1 : null
  }
}
