import {describe, test, expect} from "vitest"

import {PageArgs} from "./PageArgs.js"
import {Page} from "./Page.js"

interface Note {
  id: string
  title: string
}

const data: Note[] = Array.from({length: 100})
  .fill({})
  .map((_, i) => ({
    id: `${i + 1}`,
    title: `Test note #${i + 1}`
  }))

describe("constructor", () => {
  test("returns page with default parameters", () => {
    const args = new PageArgs()
    const actual = new Page({args, count: 0, items: []})

    expect(actual).toMatchObject({
      current: args.current,
      maxLimit: args.maxLimit,
      limit: null,
      itemsCount: 0,
      rowsCount: 0,
      pagesCount: 1,
      next: args.getNextPageNumber(actual.pagesCount),
      prev: args.getPrevPageNumber(),
      items: []
    })
  })

  test("returns properties depending on the input", () => {
    const args = new PageArgs()
    const actual = new Page({args, count: data.length, items: data})

    expect(actual).toMatchObject({
      items: data,
      rowsCount: data.length,
      pagesCount: 1
    })
  })
})

describe("pagesCount", () => {
  test("returns value according to PageArgs.limit", () => {
    const args = new PageArgs({limit: data.length / 2})
    const actual = new Page({args, count: data.length, items: data})

    expect(actual.pagesCount).toBe(2)
  })

  test("always being rounded to the greater integer", () => {
    const notes: Note[] = [
      ...data,

      {
        id: `${data.length + 1}`,
        title: `Test note ${data.length + 1}`
      } satisfies Note
    ]

    const args = new PageArgs({limit: 50})
    const actual = new Page({args, count: notes.length, items: notes})

    expect(actual.pagesCount).toBe(3)
  })
})

describe("nextCursor", () => {
  test("returns value from PageArgs.getNextPageNumber call", () => {
    const args = new PageArgs({limit: 50})
    const actual = new Page({args, count: data.length, items: data})

    expect(actual.next).toBe(args.getNextPageNumber(actual.pagesCount))
  })
})
