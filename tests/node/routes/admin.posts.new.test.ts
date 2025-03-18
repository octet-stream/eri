import {faker} from "@faker-js/faker"
import {expect, suite} from "vitest"

import {test} from "../../fixtures/admin.js"
import {createAdminAuthLoaderSuite} from "../../shared/adminAuthLoader.js"
import {createStubActionArgs} from "../../utils/createStubRouteArgs.js"

import type {IPostContent} from "../../../app/server/zod/plate/editors/PostContent.js"
import {createNodeId} from "../../../app/server/zod/plate/utils/nodeId.js"

import {action, loader} from "../../../app/routes/admin.posts.new.jsx"
import {Post} from "../../../app/server/db/entities.js"

createAdminAuthLoaderSuite(loader)

suite("action", () => {
  test("returns error when called with empty form", async ({admin}) => {
    const form = new FormData()

    const request = new Request(admin.request, {
      method: "post",
      body: form
    })

    const payload = await action(createStubActionArgs({request}))

    expect(payload.init?.status).toBe(422)
    expect(Object.keys(payload.data.error ?? {})).toEqual(["title", "content"])
  })

  test("redirects when post is created", async ({admin}) => {
    const form = new FormData()

    form.set("title", faker.lorem.sentence({min: 3, max: 5}))
    form.set(
      "content",

      JSON.stringify([
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
      ] satisfies IPostContent)
    )

    const request = new Request(admin.request, {
      method: "post",
      body: form
    })

    try {
      await action(createStubActionArgs({request}))
    } catch (error) {
      const response = error as Response

      expect(response.status).toBe(302)
      expect(response.headers.get("x-remix-replace")).toBe("true")
    }
  })

  test("location matches created post slug", async ({admin, orm}) => {
    const form = new FormData()

    form.set("title", faker.lorem.sentence({min: 3, max: 5}))
    form.set(
      "content",

      JSON.stringify([
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
      ] satisfies IPostContent)
    )

    const request = new Request(admin.request, {
      method: "post",
      body: form
    })

    try {
      await action(createStubActionArgs({request}))
    } catch (response) {
      if (!(response instanceof Response)) {
        throw response
      }

      const location = response.headers.get("location")

      expect(typeof location).toBe("string")
      expect(location?.startsWith("/admin/posts/")).toBe(true)

      const slug = location?.replace(/^\/admin\/posts\//, "")
      const post = await orm.em.findOne(Post, {slug})

      expect(post?.slug).toBe(slug)
    }
  })

  test("created post has correct title and content", async ({admin, orm}) => {
    const form = new FormData()

    const title = faker.lorem.sentence({min: 3, max: 5})
    const content: IPostContent = [
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

    form.set("title", title)
    form.set("content", JSON.stringify(content))

    const request = new Request(admin.request, {
      method: "post",
      body: form
    })

    try {
      await action(createStubActionArgs({request}))
    } catch (response) {
      if (!(response instanceof Response)) {
        throw response
      }

      const location = response.headers.get("location")

      expect(typeof location).toBe("string")
      expect(location?.startsWith("/admin/posts/")).toBe(true)

      const slug = location?.replace(/^\/admin\/posts\//, "")
      const post = await orm.em.findOne(Post, {slug}, {populate: ["content"]})

      expect(post).toMatchObject({title, content})
    }
  })
})
