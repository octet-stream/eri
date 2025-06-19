import {format} from "date-fns"
import {expect, suite, test} from "vitest"

import {
  formatSlugDate,
  formatSlugName,
  SLUG_DATE_FORMAT
} from "../../../../../app/server/lib/utils/slug.js"

suite(formatSlugDate.name, () => {
  test("formats date", () => {
    const now = new Date()

    const expected = format(now, SLUG_DATE_FORMAT)
    const actual = formatSlugDate(now)

    expect(actual).toBe(expected)
  })
})

suite(formatSlugName.name, () => {
  test("formats name", () => {
    const actual = formatSlugName("Hello-world")

    expect(actual).toBe("hello-world")
  })

  test("replaces colon symbols", () => {
    const actual = formatSlugName("Hello:world")

    expect(actual).toBe("hello-colon-world")
  })

  test("replaces '@' symbols", () => {
    const actual = formatSlugName("Hello@world")

    expect(actual).toBe("hello-at-world")
  })

  test("replaces comma symbols", () => {
    const actual = formatSlugName("Hello,world")

    expect(actual).toBe("hello-comma-world")
  })

  test("replaces period symbold", () => {
    const actual = formatSlugName("Hello.world")

    expect(actual).toBe("hello-period-world")
  })
})
