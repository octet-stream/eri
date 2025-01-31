import {format} from "date-fns"
import {describe, expect, test} from "vitest"

import {
  SLUG_DATE_FORMAT,
  formatSlugDate,
  formatSlugName
} from "../../../../../app/server/lib/utils/slug.js"

describe(formatSlugDate.name, () => {
  test("formats date", () => {
    const now = new Date()

    const expected = format(now, SLUG_DATE_FORMAT)
    const actual = formatSlugDate(now)

    expect(actual).toBe(expected)
  })
})

describe(formatSlugName.name, () => {
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
