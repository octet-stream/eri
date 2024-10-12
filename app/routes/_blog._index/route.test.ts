import {faker} from "@faker-js/faker"
import {beforeEach, describe, expect} from "vitest"

import type {OrmTestContext} from "../../../scripts/vitest/fixtures/orm.js"
import {routeTest} from "../../../scripts/vitest/fixtures/route.js"
import type {UserTestContext} from "../../../scripts/vitest/fixtures/user.js"
import {Post} from "../../server/db/entities.js"
import {createNodeId} from "../../server/zod/plate/utils/nodeId.js"

import {loader} from "./route.jsx"

describe("Loader", () => {
  describe("no data", () => {
    routeTest(
      "returns empty page when there's no posts",

      async ({loaderArgs}) => {
        const result = await loader(loaderArgs)

        expect(result.page).toMatchObject({
          items: [],
          limit: 100,
          maxLimit: 100,
          current: 1,
          prev: null,
          next: null,
          pagesCount: 0,
          rowsCount: 0,
          itemsCount: 0
        })
      }
    )
  })

  describe("with data", () => {
    beforeEach<OrmTestContext & UserTestContext>(async ({orm, user}) => {
      const posts = new Array(200).fill(undefined).map(() =>
        orm.em.create(Post, {
          author: user,
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
      )

      await orm.em.persistAndFlush(posts)
    })

    routeTest("returns first page by default", async ({loaderArgs}) => {
      const result = await loader(loaderArgs)

      expect(result.page.current).toBe(1)
    })

    routeTest("previous page is null by default", async ({loaderArgs}) => {
      const result = await loader(loaderArgs)

      expect(result.page.prev).toBe(null)
    })

    routeTest("returns first 100 posts by default", async ({loaderArgs}) => {
      const result = await loader(loaderArgs)

      expect(result.page.itemsCount).toBe(100)
    })

    routeTest("has next page", async ({loaderArgs}) => {
      const result = await loader(loaderArgs)

      expect(result.page.next).toBe(2)
    })

    routeTest("accepts page query parameter", async ({loaderArgs}) => {
      const url = new URL(loaderArgs.request.url)
      url.searchParams.set("page", "2")
      loaderArgs.request = new Request(url)

      const result = await loader(loaderArgs)

      expect(result.page.current).toBe(2)
    })

    routeTest("previous page is current - 1", async ({loaderArgs}) => {
      const url = new URL(loaderArgs.request.url)
      url.searchParams.set("page", "2")
      loaderArgs.request = new Request(url)

      const result = await loader(loaderArgs)

      expect(result.page.prev).toBe(1)
    })

    describe("errors", () => {
      routeTest(
        "throws 404 Response when page is out of range",

        async ({loaderArgs}) => {
          expect.hasAssertions()

          const url = new URL(loaderArgs.request.url)
          url.searchParams.set("page", "3")
          loaderArgs.request = new Request(url)

          try {
            await loader(loaderArgs)
          } catch (error) {
            if (!(error instanceof Response)) {
              throw error
            }

            expect(error.status).toBe(404)
          }
        }
      )
    })
  })

  describe("common errors", () => {
    routeTest(
      "throws 404 Response when page param is 0",

      async ({loaderArgs}) => {
        expect.hasAssertions()

        const url = new URL(loaderArgs.request.url)
        url.searchParams.set("page", "0")
        loaderArgs.request = new Request(url)

        try {
          await loader(loaderArgs)
        } catch (error) {
          if (!(error instanceof Response)) {
            throw error
          }

          expect(error.status).toBe(404)
        }
      }
    )

    routeTest(
      "throws 404 Response when page param less than 0",

      async ({loaderArgs}) => {
        expect.hasAssertions()

        const url = new URL(loaderArgs.request.url)
        url.searchParams.set("page", "-124")
        loaderArgs.request = new Request(url)

        try {
          await loader(loaderArgs)
        } catch (error) {
          if (!(error instanceof Response)) {
            throw error
          }

          expect(error.status).toBe(404)
        }
      }
    )
  })
})
