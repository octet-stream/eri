import {faker} from "@faker-js/faker"
import type {UNSAFE_DataWithResponseInit as DataWithResponseInit} from "react-router"
import {describe, expect, test} from "vitest"

import {loader} from "../../../app/routes/_blog.posts.$date.$name.jsx"
import {Post, User} from "../../../app/server/db/entities.js"
import {orm} from "../../../app/server/lib/db/orm.js"
import {createNodeId} from "../../../app/server/zod/plate/utils/nodeId.js"
import {createStubLoaderArgs} from "../../utils/createStubRouteArgs.js"

describe("loaders", () => {
  test("throws when post cannot be found", async () => {
    expect.hasAssertions()

    try {
      await loader(
        createStubLoaderArgs({
          params: {
            date: "1970-01-01",
            name: "this-post-will-not-be-found"
          }
        })
      )
    } catch (error) {
      const actual = error as DataWithResponseInit<null>

      expect(actual.data).toBeNull()
      expect(actual.init?.statusText).toBe("Unable to find post")
      expect(actual.init?.status).toBe(404)
    }
  })

  test("fetches a post by its slug", async () => {
    const user = orm.em.create(User, {
      email: faker.internet.email()
    })

    const post = orm.em.create(Post, {
      author: user,
      title: faker.lorem.sentence({min: 3, max: 4}),
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

    const [date, name] = post.slug.split("/")

    const actual = await loader(
      createStubLoaderArgs({
        params: {date, name}
      })
    )

    expect(actual.id).toBe(post.id)
  })
})
