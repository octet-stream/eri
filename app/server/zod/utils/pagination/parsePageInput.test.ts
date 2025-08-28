import {expect, test} from "vitest"
import {DefaultPageInput} from "./createPageInput.ts"
import {PageArgs} from "./PageArgs.ts"
import {parsePageInput} from "./parsePageInput.ts"

test("Returns default page input", () => {
  const actual = parsePageInput(DefaultPageInput, {})

  expect(actual).toBeTypeOf("object")
  expect(actual.args).toBeInstanceOf(PageArgs)
})

test("Throws 404 Response error for invalid input", () => {
  try {
    parsePageInput(DefaultPageInput, {
      page: "Invalid input"
    })
  } catch (error) {
    const resp = error as Response

    expect(resp).toBeInstanceOf(Response)
    expect(resp.status).toBe(404)
  }
})
