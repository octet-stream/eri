import {expect, expectTypeOf, test, vi} from "vitest"
import {z} from "zod"

import {resolveResult} from "../../../../../app/server/zod/utils/resolveResult.ts"

test("Returns the result", () => {
  const expected: string = "Hello, world!"
  const actual = resolveResult(z.string().safeParse(expected))

  expect(actual).toBe(expected)
  expectTypeOf(actual).toBeString()
})

test("Throws default error Response", () => {
  expect.assertions(2)

  try {
    resolveResult(z.string().safeParse([42, 451]))
  } catch (error) {
    const resp = error as Response

    expect(resp).toBeInstanceOf(Response)
    expect(resp.status).toBe(500)
  }
})

test("Calls given onError function", () => {
  expect.assertions(1)

  const onError = vi.fn((): never => {
    throw new Error("Something is broken")
  })

  try {
    resolveResult(z.string().safeParse(false), {
      onError
    })
  } catch {
    expect(onError).toBeCalled()
  }
})
