import type {IPageInput} from "server/trpc/type/input/PageInput"

export const DEFAULT_PAGE_INPUT: IPageInput = {
  cursor: 1,
  limit: 50
}

export class PageArgs implements IPageInput {
  readonly #cursor: number

  readonly #limit: number | undefined

  readonly #offset: number | undefined

  constructor({cursor, limit}: IPageInput = DEFAULT_PAGE_INPUT) {
    this.#cursor = cursor
    this.#limit = limit
    this.#offset = limit ? limit * (cursor - 1) : undefined
  }

  get offset(): number | undefined {
    return this.#offset
  }

  get cursor(): number {
    return this.#cursor
  }

  get limit(): number | undefined {
    return this.#limit
  }

  /**
   * Returns the number of the next page.
   * Will return `null` once you reach the last page.
   *
   * @param pages An amount of rows in a table
   */
  getNextCursor(pages: number): number | null {
    return pages > 1 && this.cursor < pages ? this.cursor + 1 : null
  }

  /**
   * Returns the number of the previous page.
   * Will be null once you're on the first page.
   */
  getPrevCursor(): number | null {
    return this.cursor > 1 ? this.cursor - 1 : null
  }
}
