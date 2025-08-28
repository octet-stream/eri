import {expect, test} from "vitest"

import {matchHttpMethods} from "../../../../../app/server/lib/utils/matchHttpMethods.ts"

test("returns true when Request matches given http method", () => {
  const request = new Request("http://localhost", {method: "post"})

  expect(matchHttpMethods(request, "POST")).toBe(true)
})

test("returns false when Request method doesn't match given http method", () => {
  const request = new Request("http://localhost", {method: "head"})

  expect(matchHttpMethods(request, "GET")).toBe(false)
})
