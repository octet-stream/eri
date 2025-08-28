import {describe, expect, test} from "vitest"

import {PageArgs} from "./PageArgs.ts"

describe("constructor", () => {
  test("returns args with default values", () => {
    const actual = new PageArgs()

    expect(actual).toMatchObject({
      current: 1,
      maxLimit: null,
      limit: undefined,
      offset: undefined
    })
  })
})

describe("limit", () => {
  test("returned value corresponds the input", () => {
    const expected = 42
    const actual = new PageArgs({limit: expected})

    expect(actual.limit).toBe(expected)
  })
})

describe("current", () => {
  test("returned value corresponds the input", () => {
    const expected = 451
    const actual = new PageArgs({page: expected})

    expect(actual.current).toBe(expected)
  })
})

describe("maxLimit", () => {
  test("returned value corresponds the input", () => {
    const expected = 1024
    const actual = new PageArgs({maxLimit: expected})

    expect(actual.maxLimit).toBe(expected)
  })
})

describe("offset", () => {
  const limit = 50

  test("returns undefined if limit is not set", () => {
    const actual = new PageArgs({page: 1})

    expect(actual.offset).toBeUndefined()
  })

  test("returns 0 if the current page is 1", () => {
    const actual = new PageArgs({limit, page: 1})

    expect(actual.offset).toBe(0)
  })

  test("returns a value that is equal to limit if current page is 2", () => {
    const actual = new PageArgs({limit, page: 2})

    expect(actual.offset).toBe(limit)
  })

  test("returns limit * n when current page > 2", () => {
    const actual = new PageArgs({limit, page: 3})

    expect(actual.offset).toBe(limit * 2)
  })
})

describe("getNextPageNumber", () => {
  test("always returns null when current page is not set", () => {
    const actual = new PageArgs()

    expect(actual.getNextPageNumber(1)).toBeNull()
  })

  test("returns null when given pages arg >= current page", () => {
    const actual = new PageArgs({page: 42})

    expect(actual.getNextPageNumber(42)).toBeNull()
  })

  test("returns the number of the next page", () => {
    const current = 41
    const actual = new PageArgs({page: current})

    expect(actual.getNextPageNumber(451)).toBe(current + 1)
  })
})

describe("getPrevPageNumber", () => {
  test("returns null if current page is not set", () => {
    const actual = new PageArgs()

    expect(actual.getPrevPageNumber()).toBeNull()
  })

  test("returns null if current page <= 1", () => {
    const actual = new PageArgs({page: 1})

    expect(actual.getPrevPageNumber()).toBeNull()
  })

  test("returns the number of the previous page if current page > 1", () => {
    const actual = new PageArgs({page: 2})

    expect(actual.getPrevPageNumber()).toBe(1)
  })
})
