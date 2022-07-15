import type {IPageOutput} from "server/trpc/type/output/PageOutput"

import {PageArgs} from "./PageArgs"

export interface PageOutputInput<T> {
  items: T[]
  total: number
  args: PageArgs
}

export class Page<T> implements IPageOutput<T> {
  readonly #items: T[]

  readonly #total: number

  readonly #nextCursor: number | null

  readonly #prevCursor: number | null

  constructor({items, total, args}: PageOutputInput<T>) {
    this.#items = items
    this.#total = total
    this.#nextCursor = args.getNextCursor(total)
    this.#prevCursor = args.getPrevCursor()
  }

  get items(): T[] {
    return this.#items
  }

  get total(): number {
    return this.#total
  }

  get nextCursor(): number | null {
    return this.#nextCursor
  }

  get prevCursor(): number | null {
    return this.#prevCursor
  }

  toJSON() {
    return {
      prevCursor: this.prevCursor,
      nextCursor: this.nextCursor,
      items: this.items,
      total: this.total
    }
  }
}
