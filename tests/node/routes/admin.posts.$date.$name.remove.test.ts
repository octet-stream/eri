import {faker} from "@faker-js/faker"
import dedent from "dedent"
import {expect, suite} from "vitest"

import {action} from "../../../app/routes/admin.posts.$date.$name.remove.tsx"
import {Post} from "../../../app/server/db/entities.ts"
import {AdminPostInput} from "../../../app/server/zod/admin/AdminPostInput.ts"
import {adminTest} from "../../fixtures/admin.ts"
import {createStubActionArgs} from "../../utils/createStubRouteArgs.ts"

interface PostRemoveTestContext {
  post: Post
}

const test = adminTest.extend<PostRemoveTestContext>({
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
      title: input.title.textContent,
      content: input.content.toJSON()
    })

    await orm.em.persistAndFlush(post)
    await use(post)
  }
})

suite("action", () => {
  test("soft-removes a post by default", async ({post, orm, admin}) => {
    const [date, name] = post.slug.split("/")

    const request = new Request(admin.request, {
      method: "POST", // undici warns this method being in lowercase
      body: new FormData()
    })

    try {
      await action(createStubActionArgs({request, params: {date, name}}))
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
    admin
  }) => {
    const [date, name] = post.slug.split("/")

    const form = new FormData()

    form.set("permanent", "true")

    const request = new Request(admin.request, {
      method: "POST", // undici warns this method being in lowercase
      body: form
    })

    try {
      await action(createStubActionArgs({request, params: {date, name}}))
    } catch (error) {
      if (!(error instanceof Response)) {
        throw error
      }

      await expect(orm.em.findOne(Post, post.id)).resolves.toBeNull()
    }
  })
})
