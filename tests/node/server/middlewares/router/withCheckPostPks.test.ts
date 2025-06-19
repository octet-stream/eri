import {faker} from "@faker-js/faker"
import dedent from "dedent"
import type {FC} from "react"
import {unstable_RouterContextProvider as RouteContextProvider} from "react-router"
import {expect, suite, vi} from "vitest"
import {matchesContext} from "../../../../../app/server/contexts/matches.js"
import {Post} from "../../../../../app/server/db/entities.js"
import {
  getRouteMatches,
  type ServerRouteManifest
} from "../../../../../app/server/lib/utils/routes.js"
import {withCheckPostPks} from "../../../../../app/server/middlewares/router/withCheckPostPks.js"
import {
  AdminPostInput,
  type IAdminPostInput
} from "../../../../../app/server/zod/admin/AdminPostInput.js"
import {adminTest} from "../../../../fixtures/admin.js"
import {createStubMiddlewareArgs} from "../../../../utils/createStubRouteArgs.js"
import {noopFunction} from "../../../../utils/noopFunction.js"

const NoopComponent: FC = () => null

interface PostEditTestContext {
  /**
   * Provides a fresh Post entity created for each test
   */
  post: Post

  /**
   * Provides context with empty route matches.
   */
  context: RouteContextProvider

  /**
   * Provides set of default routes
   */
  routes: ServerRouteManifest
}

const test = adminTest.extend<PostEditTestContext>({
  async post({orm, admin}, use) {
    const input = AdminPostInput.parse({
      fallback: "true",
      markdown: dedent`
        # ${faker.lorem.sentence({min: 3, max: 4})}

        ${faker.lorem.paragraph()}
      `
    } satisfies IAdminPostInput)

    const post = orm.em.create(Post, {
      author: admin.viewer,
      title: input.title.textContent,
      content: input.content.toJSON()
    })

    await orm.em.persistAndFlush(post)
    await use(post)
  },

  async routes({task: _}, use) {
    await use({
      root: {
        id: "root",
        parentId: undefined,
        module: {
          default: NoopComponent
        }
      },
      "routes/some.other.path": {
        id: "routes/some.other.path",
        parentId: "root",
        path: "some/other/path",
        module: {
          default: NoopComponent
        }
      },
      "routes/posts": {
        id: "routes/_blog.posts",
        parentId: "root",
        path: "posts",
        module: {
          default: NoopComponent
        }
      },
      "routes/_blog.posts.$date.$name": {
        id: "routes/_blog.posts.$date.$name",
        parentId: "routes/_blog.posts",
        path: ":date/:name",
        module: {
          default: NoopComponent
        }
      }
    })
  },

  async context({task: _}, use) {
    const context = new RouteContextProvider()

    context.set(matchesContext, [])

    await use(context)
  }
})

const middleware = withCheckPostPks()

suite("calls 'next' function in a sequence", () => {
  test("no matched routes found", async ({context}) => {
    const next = vi.fn()

    await middleware(createStubMiddlewareArgs({context}), next)

    expect(next).toBeCalled()
  })

  test("current route is not in allowed list", async ({context, routes}) => {
    const next = vi.fn()
    const request = new Request("http://localhost/some/other/path")

    context.set(matchesContext, getRouteMatches(routes, request.url) ?? [])

    await middleware(createStubMiddlewareArgs({request, context}), next)

    expect(next).toBeCalled()
  })

  test("invalid 'date' or 'name' parameter", async ({context, routes}) => {
    const next = vi.fn()
    const request = new Request("http://localhost/posts/foo/bar~123ab") // date parameter is invalid on purpose

    context.set(matchesContext, getRouteMatches(routes, request.url) ?? [])

    await middleware(createStubMiddlewareArgs({request, context}), next)

    expect(next).toBeCalled()
  })

  test("the 'url' matches current post location", async ({
    context,
    routes,
    post
  }) => {
    const next = vi.fn()
    const request = new Request(`http://localhost/posts/${post.slug}`)

    context.set(matchesContext, getRouteMatches(routes, request.url) ?? [])

    await middleware(createStubMiddlewareArgs({request, context}), next)

    expect(next).toBeCalled()
  })
})

suite("redirects", () => {
  test("throws permanent redirect response", async ({
    context,
    routes,
    post,
    orm
  }) => {
    expect.hasAssertions()

    const request = new Request(`http://localhost/posts/${post.slug}`) // date parameter is invalid on purpose

    post.title = "Updated title"

    await orm.em.flush()

    context.set(matchesContext, getRouteMatches(routes, request.url) ?? [])

    try {
      await middleware(
        createStubMiddlewareArgs({request, context}),

        noopFunction
      )
    } catch (error) {
      if (!(error instanceof Response)) {
        throw error
      }

      expect(error.status, "Must be permanent redirect").toBe(301)
    }
  })

  test("location header points to the current post address", async ({
    context,
    routes,
    post,
    orm
  }) => {
    expect.hasAssertions()

    const request = new Request(`http://localhost/posts/${post.slug}`) // date parameter is invalid on purpose

    post.title = "Updated title"

    await orm.em.flush()

    context.set(matchesContext, getRouteMatches(routes, request.url) ?? [])

    try {
      await middleware(
        createStubMiddlewareArgs({request, context}),

        noopFunction
      )
    } catch (error) {
      if (!(error instanceof Response)) {
        throw error
      }

      expect(error.headers.get("location")).toBe(`/posts/${post.slug}`)
    }
  })
})
