import {faker} from "@faker-js/faker"
import dedent from "dedent"
import {expect, suite} from "vitest"

import {action} from "#app/routes/admin.posts.$date.$name.remove.tsx"
import {Post} from "#app/server/db/entities.ts"
import {getPostTitle} from "#app/server/lib/editor/utils.ts"
import {slugToParams} from "#app/server/lib/utils/slug.ts"
import {AdminPostInput} from "#app/server/zod/admin/AdminPostInput.ts"
import {adminRouterTest} from "#tests/fixtures/adminRouter.ts"

interface PostRemoveTestContext {
  post: Post
}

const test = adminRouterTest.extend<PostRemoveTestContext>({
  async post({orm, admin}, use) {
    const input = AdminPostInput.parse({
      fallback: "true",
      markdown: dedent`
        # ${faker.lorem.sentence({min: 3, max: 4})}

        ${faker.lorem.paragraph()}
      `
    })

    const post = orm.em.create(Post, {
      author: admin.viewer,
      title: getPostTitle(input).textContent,
      content: input.content.toJSON()
    })

    await orm.em.persist(post).flush()
    await use(post)
  }
})

suite("action", () => {
  test("soft-removes a post by default", async ({
    post,
    orm,
    admin,
    routerStubs
  }) => {
    const {date, name} = slugToParams(post.slug)

    const request = new Request(admin.request, {
      method: "POST", // undici warns this method being in lowercase
      body: new FormData()
    })

    try {
      await action(
        routerStubs.createActionArgs({request, params: {date, name}})
      )
    } catch (error) {
      if (!(error instanceof Response)) {
        throw error
      }

      const actual = await orm.em.findOneOrFail(Post, post.id)

      expect(actual.removedAt).not.toBeNull()
    }
  })

  test("removes a post from db when permanent is set to true", async ({
    post,
    orm,
    admin,
    routerStubs
  }) => {
    const {date, name} = slugToParams(post.slug)

    const form = new FormData()

    form.set("permanent", "true")

    const request = new Request(admin.request, {
      method: "POST", // undici warns this method being in lowercase
      body: form
    })

    try {
      await action(
        routerStubs.createActionArgs({request, params: {date, name}})
      )
    } catch (error) {
      if (!(error instanceof Response)) {
        throw error
      }

      await expect(orm.em.findOne(Post, post.id)).resolves.toBeNull()
    }
  })
})
