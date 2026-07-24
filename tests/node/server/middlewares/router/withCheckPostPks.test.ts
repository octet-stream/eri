import {faker} from "@faker-js/faker"
import dedent from "dedent"
import type {FC} from "react"
import {expect, suite, vi} from "vitest"
import {matchesContext} from "#app/server/contexts/matches.ts"
import {Post} from "#app/server/db/entities.ts"
import {getPostTitle} from "#app/server/lib/editor/utils.ts"
import {getRouteMatches} from "#app/server/lib/utils/routes.js"
import {withCheckPostPks} from "#app/server/middlewares/router/withCheckPostPks.ts"
import {
  AdminPostInput,
  type IAdminPostInput
} from "#app/server/zod/admin/AdminPostInput.js"

import {adminRouterTest} from "#tests/fixtures/adminRouter.ts"
import {asyncNoopFunction} from "#tests/utils/noopFunction.ts"

const NoopComponent: FC = () => null

const test = adminRouterTest
  .extend("context", ({routerContext}) => {
    routerContext.set(matchesContext, [])

    return routerContext
  })
  .extend("routes", {
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
  .extend("post", async ({orm, admin}) => {
    const input = AdminPostInput.parse({
      fallback: "true",
      markdown: dedent`
        # ${faker.lorem.sentence({min: 3, max: 4})}

        ${faker.lorem.paragraph()}
      `
    } satisfies IAdminPostInput)

    const post = orm.em.create(Post, {
      author: admin.viewer,
      title: getPostTitle(input).textContent,
      content: input.toJSON()
    })

    await orm.em.persist(post).flush()

    return post
  })

const middleware = withCheckPostPks()

suite("calls 'next' function in a sequence", () => {
  test("no matched routes found", async ({context, routerStubs}) => {
    const next = vi.fn()

    await middleware(routerStubs.createMiddlewareArgs({context}), next)

    expect(next).toHaveBeenCalled()
  })

  test("current route is not in allowed list", async ({
    context,
    routes,
    routerStubs
  }) => {
    const next = vi.fn()
    const request = new Request("http://localhost/some/other/path")

    context.set(matchesContext, getRouteMatches(routes, request.url) ?? [])

    await middleware(routerStubs.createMiddlewareArgs({request, context}), next)

    expect(next).toHaveBeenCalled()
  })

  test("invalid 'date' or 'name' parameter", async ({
    context,
    routes,
    routerStubs
  }) => {
    const next = vi.fn()
    const request = new Request("http://localhost/posts/foo/bar~123ab") // date parameter is invalid on purpose

    context.set(matchesContext, getRouteMatches(routes, request.url) ?? [])

    await middleware(routerStubs.createMiddlewareArgs({request, context}), next)

    expect(next).toHaveBeenCalled()
  })

  test("the 'url' matches current post location", async ({
    context,
    routes,
    post,
    routerStubs
  }) => {
    const next = vi.fn()
    const request = new Request(`http://localhost/posts/${post.slug}`)

    context.set(matchesContext, getRouteMatches(routes, request.url) ?? [])

    await middleware(routerStubs.createMiddlewareArgs({request, context}), next)

    expect(next).toHaveBeenCalled()
  })
})

suite("redirects", () => {
  test("throws permanent redirect response", async ({
    context,
    routes,
    post,
    orm,
    routerStubs
  }) => {
    expect.hasAssertions()

    const request = new Request(`http://localhost/posts/${post.slug}`) // date parameter is invalid on purpose

    post.title = "Updated title"

    await orm.em.flush()

    context.set(matchesContext, getRouteMatches(routes, request.url) ?? [])

    try {
      await middleware(
        routerStubs.createMiddlewareArgs({request, context}),

        asyncNoopFunction
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
    orm,
    routerStubs
  }) => {
    expect.hasAssertions()

    const request = new Request(`http://localhost/posts/${post.slug}`) // date parameter is invalid on purpose

    post.title = "Updated title"

    await orm.em.flush()

    context.set(matchesContext, getRouteMatches(routes, request.url) ?? [])

    try {
      await middleware(
        routerStubs.createMiddlewareArgs({request, context}),

        asyncNoopFunction
      )
    } catch (error) {
      if (!(error instanceof Response)) {
        throw error
      }

      expect(error.headers.get("location")).toBe(`/posts/${post.slug}`)
    }
  })
})
