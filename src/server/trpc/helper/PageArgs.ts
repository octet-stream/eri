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

  getNextCursor(total: number): number | null {
    return this.offset && this.offset < total ? this.cursor + 1 : null
  }

  getPrevCursor(): number | null {
    return this.cursor > 1 ? this.cursor - 1 : null
  }
}
