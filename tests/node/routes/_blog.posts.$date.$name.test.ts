import {faker} from "@faker-js/faker"
import dedent from "dedent"
import type {UNSAFE_DataWithResponseInit as DataWithResponseInit} from "react-router"
import {expect, suite} from "vitest"
import {loader} from "../../../app/routes/_blog.posts.$date.$name.tsx"
import {Post, User} from "../../../app/server/db/entities.ts"
import {AdminPostInput} from "../../../app/server/zod/admin/AdminPostInput.ts"
import {test} from "../../fixtures/orm.ts"
import {createStubLoaderArgs} from "../../utils/createStubRouteArgs.ts"

suite("loader", () => {
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
      const actual = error as DataWithResponseInit<never>

      expect(actual.data).toBeNull()
      expect(actual.init?.statusText).toBe("Unable to find post")
      expect(actual.init?.status).toBe(404)
    }
  })

  test("fetches a post by its slug", async ({orm}) => {
    const user = orm.em.create(User, {
      email: faker.internet.email()
    })

    const input = AdminPostInput.parse({
      fallback: "true",
      markdown: dedent`
        # ${faker.lorem.sentence({min: 3, max: 4})}

        ${faker.lorem.paragraph()}
      `
    })

    const post = orm.em.create(Post, {
      author: user,
      title: input.title.textContent,
      content: input.content.toJSON()
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
