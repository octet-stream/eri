import {test, expect, describe} from "vitest"
import {format} from "date-fns"

import {
  formatSlugDate,
  formatSlugName,
  SLUG_DATE_FORMAT
} from "./slug.js"

describe(formatSlugDate.name, () => {
  test("Returns formatted date", () => {
    const now = new Date()

    const expected = format(now, SLUG_DATE_FORMAT)
    const actual = formatSlugDate(now)

    expect(actual).toBe(expected)
  })
})

describe(formatSlugName.name, () => {
  test("Returns formatted name", () => {
    const actual = formatSlugName("Hello-world")

    expect(actual).toBe("hello-world")
  })

  test("Replaces colon symbol with the word", () => {
    const actual = formatSlugName("Hello:world")

    expect(actual).toBe("hello-colon-world")
  })

  test("Replaces @ (at) symbol with the word", () => {
    const actual = formatSlugName("Hello@world")

    expect(actual).toBe("hello-at-world")
  })

  test("Replaces comma symbol with the word", () => {
    const actual = formatSlugName("Hello,world")

    expect(actual).toBe("hello-comma-world")
  })

  test("Replaces period symbol with the word", () => {
    const actual = formatSlugName("Hello.world")

    expect(actual).toBe("hello-period-world")
  })
})
