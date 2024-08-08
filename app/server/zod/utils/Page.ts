import type {MaybeNull} from "../../../lib/types/MaybeNull.js"
import type {Simplify} from "../../../lib/types/Simplify.js"

import type {PageArgs} from "./PageArgs.js"

export interface PageOutputInput<T extends object> {
  /**
   * List of current page items
   */
  items: T[]

  /**
   * An amount of total rows in a table
   */
  count: number

  /**
   * Instance of `PageArgs` class
   */
  args: PageArgs
}

export interface PageOutput<T extends object> {
  /**
   * List of current page items.
   */
  items: T[]

  /**
   * Items per page limit.
   */
  limit: MaybeNull<number>

  /**
   * Max amount of the items for this page type
   */
  maxLimit: MaybeNull<number>

  /**
   * The number of the current page.
   */
  current: number

  /**
   * Next page number.
   * Will be `null` once you reach the last page.
   */
  next: MaybeNull<number>

  /**
   * Previous page number.
   * Will be `null` once you're on the first page.
   */
  prev: MaybeNull<number>

  /**
   * Total amount of items in the list
   */
  itemsCount: number

  /**
   * Total amount of rows in table
   */
  rowsCount: number

  /**
   * Total number of pages. Will always be `1` when the `limit` is `undefined`.
   */
  pagesCount: number
}

export class Page<T extends object> implements PageOutput<T> {
  readonly #items: T[]

  readonly #current: number

  readonly #limit: MaybeNull<number>

  readonly #maxLimit: MaybeNull<number>

  readonly #pagesCount: number

  readonly #rowsCount: number

  readonly #itemsCount: number

  readonly #next: MaybeNull<number>

  readonly #prev: MaybeNull<number>

  constructor({items, count, args}: PageOutputInput<T>) {
    this.#items = items
    this.#rowsCount = count
    this.#current = args.current
    this.#limit = args.limit ?? null
    this.#maxLimit = args.maxLimit
    this.#itemsCount = items.length

    // Calculate `pagesCount` only when `args.limit` is set. Always return `1` otherwise.
    this.#pagesCount = args.limit ? Math.ceil(count / args.limit) : 1

    this.#next = args.getNextPageNumber(this.pagesCount)
    this.#prev = args.getPrevPageNumber()
  }

  get items(): T[] {
    return this.#items
  }

  get limit(): MaybeNull<number> {
    return this.#limit
  }

  get maxLimit(): MaybeNull<number> {
    return this.#maxLimit
  }

  get current(): number {
    return this.#current
  }

  get pagesCount(): number {
    return this.#pagesCount
  }

  get rowsCount(): number {
    return this.#rowsCount
  }

  get itemsCount(): number {
    return this.#itemsCount
  }

  get next(): MaybeNull<number> {
    return this.#next
  }

  get prev(): MaybeNull<number> {
    return this.#prev
  }

  toJSON(): Simplify<PageOutput<T>> {
    return {
      items: this.items,
      limit: this.limit,
      maxLimit: this.maxLimit,
      current: this.current,
      prev: this.prev,
      next: this.next,
      pagesCount: this.pagesCount,
      rowsCount: this.rowsCount,
      itemsCount: this.itemsCount
    }
  }
}
