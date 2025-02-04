import {faker} from "@faker-js/faker"
import type {UNSAFE_DataWithResponseInit as DataWithResponseInit} from "react-router"
import {describe, expect} from "vitest"

import {adminTest} from "../../fixtures/admin.js"
import {createStubActionArgs} from "../../utils/createStubRouteArgs.js"

import {Post} from "../../../app/server/db/entities.js"
import {formatSlugName} from "../../../app/server/lib/utils/slug.js"
import {createNodeId} from "../../../app/server/zod/plate/utils/nodeId.js"

import {action} from "../../../app/routes/admin.posts.$date.$name.edit.jsx"

interface PostEditTestContext {
  post: Post
}

const test = adminTest.extend<PostEditTestContext>({
  async post({orm, admin}, use) {
    const post = orm.em.create(Post, {
      author: admin.viewer,
      title: faker.lorem.sentence({min: 3, max: 5}),
      content: [
        {
          id: createNodeId(),
          type: "p",
          children: [
            {
              id: createNodeId(),
              text: faker.lorem.paragraph()
            }
          ]
        }
      ]
    })

    await orm.em.persistAndFlush(post)
    await use(post)
  }
})

describe("action", () => {
  test("redirects back to post", async ({post, admin}) => {
    expect.hasAssertions()

    const request = new Request(admin.request, {
      method: "patch".toUpperCase(), // undici warns this method being in lowercase, so I just quickly put this call here
      body: new FormData()
    })

    const [date, name] = post.slug.split("/")

    try {
      await action(createStubActionArgs({request, params: {date, name}}))
    } catch (response) {
      if (!(response instanceof Response)) {
        throw response
      }

      expect(response.status).toBe(302)
      expect(response.headers.get("location")).toBe(`/admin/posts/${post.slug}`)
    }
  })

  test("updates post title", async ({post, admin, orm}) => {
    expect.hasAssertions()

    const title = "Testing, testing, 1, 2, 3"
    const form = new FormData()

    form.set("title", title)

    const request = new Request(admin.request, {
      method: "patch".toUpperCase(), // undici warns this method being in lowercase, so I just quickly put this call here
      body: form
    })

    const [date, name] = post.slug.split("/")

    try {
      await action(createStubActionArgs({request, params: {date, name}}))
    } catch (response) {
      if (!(response instanceof Response)) {
        throw response
      }

      const updated = await orm.em.refresh(post)

      expect(updated?.title).toBe(title)
      expect(updated?.slug.includes(`/${formatSlugName(title)}~`)).toBe(true) // Slug should be updated with title
      expect(response.headers.get("location")).toBe(
        `/admin/posts/${updated?.slug ?? ""}` // Should redirect with updated slug
      )
    }
  })

  test("throws 405 error when called with unsupported method", async ({
    admin
  }) => {
    expect.hasAssertions()

    const request = new Request(admin.request, {
      method: "post" // undici warns this method being in lowercase, so I just quickly put this call here
    })

    try {
      await action(createStubActionArgs({request}))
    } catch (error) {
      const response = error as DataWithResponseInit<null>

      expect(response.init?.status).toBe(405)
    }
  })
})
