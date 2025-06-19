import {faker} from "@faker-js/faker"
import {getSchema} from "@tiptap/core"
import {Node} from "@tiptap/pm/model"
import dedent from "dedent"
import {expect, suite} from "vitest"
import {extensions} from "../../../app/components/post-editor/extensions.js"
import {
  action,
  loader
} from "../../../app/routes/admin.posts.$date.$name.edit.jsx"
import {Post} from "../../../app/server/db/entities.js"
import {formatSlugName} from "../../../app/server/lib/utils/slug.js"
import {AdminPostInput} from "../../../app/server/zod/admin/AdminPostInput.js"
import {adminTest} from "../../fixtures/admin.js"
import {createAdminAuthLoaderSuite} from "../../shared/adminAuthLoader.js"
import {createStubActionArgs} from "../../utils/createStubRouteArgs.js"

interface PostEditTestContext {
  post: Post
}

const schema = getSchema(extensions)

const test = adminTest.extend<PostEditTestContext>({
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

createAdminAuthLoaderSuite(loader)

suite("action", () => {
  test("redirects back to post", async ({post, admin}) => {
    expect.hasAssertions()

    const form = new FormData()

    form.set("content", JSON.stringify(post.content))

    const request = new Request(admin.request, {
      method: "POST", // undici warns this method being in lowercase
      body: form
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

    const title = schema.text("Testing, testing, 1, 2, 3")
    const form = new FormData()

    const node = Node.fromJSON(schema, post.content)

    form.set(
      "content",

      // TODO: Find better way to override document
      JSON.stringify(
        node
          .copy(
            node.content.replaceChild(
              0,

              schema.node("heading", null, title)
            )
          )
          .toJSON()
      )
    )

    const request = new Request(admin.request, {
      method: "POST", // undici warns this method being in lowercase
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

      expect(updated?.title).toBe(title.textContent)
      expect(
        updated?.slug.includes(`/${formatSlugName(title.textContent)}~`)
      ).toBe(true) // Slug should be updated with title
      expect(response.headers.get("location")).toBe(
        `/admin/posts/${updated?.slug ?? ""}` // Should redirect with updated slug
      )
    }
  })
})
