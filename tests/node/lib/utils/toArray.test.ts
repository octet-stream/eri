import {expect, test} from "vitest"

import {toArray} from "../../../../app/lib/utils/toArray.ts"

test("creates array from given argument", () => {
  const input = 42

  expect(toArray(input)).toEqual([input])
})

test("returns array from array argument", () => {
  const input = ["a", "b", "c"]

  expect(toArray(input)).toEqual(input)
})

test("copies given array argument", () => {
  const input = ["a", "b", "c"]

  expect(toArray(input)).not.toBe(input)
})
