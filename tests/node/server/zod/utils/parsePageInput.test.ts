import {expect, test} from "vitest"

import {DefaultPageInput} from "../../../../../app/server/zod/utils/pagination/createPageInput.ts"
import {PageArgs} from "../../../../../app/server/zod/utils/pagination/PageArgs.ts"
import {parsePageInput} from "../../../../../app/server/zod/utils/pagination/parsePageInput.ts"

test("Returns default page input", () => {
  const actual = parsePageInput(DefaultPageInput, {})

  expect(actual).toBeTypeOf("object")
  expect(actual.args).toBeInstanceOf(PageArgs)
})

test("Supports URLSearchParams as input", () => {
  const expected = 42
  const input = new URLSearchParams()

  input.set("page", `${expected}`)

  const actual = parsePageInput(DefaultPageInput, input)

  expect(actual.args.current).toBe(expected)
})

test("Throws 404 Response error for invalid input", () => {
  try {
    parsePageInput(DefaultPageInput, {
      page: "Invalid input"
    })
  } catch (error) {
    const response = error as Response

    expect(response).toBeInstanceOf(Response)
    expect(response.status).toBe(404)
  }
})
