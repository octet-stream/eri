import {test, expect} from "vitest"

import {AnyText, type IAnyText} from "./AnyText.js"

test("Validates rich text", async () => {
  const expected: IAnyText = {
    text: "Bold text",
    bold: true
  }

  const actual = await AnyText.parseAsync(expected)

  expect(actual).toMatchObject(expected)
})

test("Validates empty text", async () => {
  const expected: IAnyText = {
    text: ""
  }

  const actual = await AnyText.parseAsync(expected)

  expect(actual).toMatchObject(expected)
})

test("Validates inline code text", async () => {
  const expected: IAnyText = {
    text: "pnpm create remix@latest",
    code: true
  }

  const actual = await AnyText.parseAsync(expected)

  expect(actual).toMatchObject(expected)
})

test("Validates kbd formatted text", async () => {
  const expected: IAnyText = {
    text: "Cmd + K B",
    kbd: true
  }

  const actual = await AnyText.parseAsync(expected)

  expect(actual).toMatchObject(expected)
})
