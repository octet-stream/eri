import {faker} from "@faker-js/faker"
import type {JSONContent} from "@tiptap/core"
import {Node} from "@tiptap/pm/model"
import dedent from "dedent"
import {expect, suite, test} from "vitest"

import {
  AdminPostInput,
  type IAdminPostInput
} from "#app/server/zod/admin/AdminPostInput.ts"

suite("markdown input", () => {
  test("returns document with title and content", () => {
    const title = faker.lorem.sentences({min: 2, max: 6})
    const content = faker.lorem.paragraphs({max: 10, min: 1})

    const result = AdminPostInput.parse({
      fallback: true,
      markdown: dedent`
        # ${title}

        ${content}
      `
    } satisfies IAdminPostInput)

    expect(result.title).toBeInstanceOf(Node)
    expect(result.content).toBeInstanceOf(Node)
  })
})

suite("json input", () => {
  test("parses json string", () => {
    const title = faker.lorem.sentences({min: 2, max: 6})
    const content = faker.lorem.paragraphs({max: 10, min: 1})

    const result = AdminPostInput.parse({
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: {
              level: 1
            },
            content: [
              {
                type: "text",
                text: title
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: content
              }
            ]
          }
        ]
      } satisfies JSONContent)
    } satisfies IAdminPostInput)

    expect(result.title).toBeInstanceOf(Node)
    expect(result.content).toBeInstanceOf(Node)
  })
})
