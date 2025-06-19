import {expect, test} from "vitest"
import {DefaultPageInput} from "./createPageInput.js"
import {PageArgs} from "./PageArgs.js"
import {parsePageInput} from "./parsePageInput.js"

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
