import {faker} from "@faker-js/faker"
import {beforeEach, describe, expect} from "vitest"

import {type OrmTestContext, test} from "../../fixtures/orm.js"
import {createStubLoaderArgs} from "../../utils/createStubRouteArgs.js"

import {Post, User} from "../../../app/server/db/entities.js"
import {createNodeId} from "../../../app/server/zod/plate/utils/nodeId.js"

import {loader} from "../../../app/routes/_blog._index/route.jsx"

describe("loader", () => {
  describe("no data", async () => {
    test("returns empty page", async () => {
      const page = await loader(createStubLoaderArgs())

      expect(page).toMatchObject({
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
    })
  })

  describe("with data", () => {
    beforeEach<OrmTestContext>(async ({orm}) => {
      const user = orm.em.create(User, {
        email: faker.internet.exampleEmail()
      })

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

    test("returns first page by default", async () => {
      const page = await loader(createStubLoaderArgs())

      expect(page.current).toBe(1)
    })

    test("returns first page by default", async () => {
      const page = await loader(createStubLoaderArgs())

      expect(page.current).toBe(1)
    })

    test("previous page is null by default", async () => {
      const page = await loader(createStubLoaderArgs())

      expect(page.prev).toBe(null)
    })

    test("returns first 100 posts by default", async () => {
      const page = await loader(createStubLoaderArgs())

      expect(page.itemsCount).toBe(100)
    })

    test("has next page", async () => {
      const page = await loader(createStubLoaderArgs())

      expect(page.next).toBe(2)
    })

    test("accepts page query parameter", async () => {
      const url = new URL("http://localhost")
      url.searchParams.set("page", "2")

      const page = await loader(
        createStubLoaderArgs({
          request: new Request(url)
        })
      )

      expect(page.current).toBe(2)
    })

    test("previous page is current - 1", async () => {
      const url = new URL("http://localhost")
      url.searchParams.set("page", "2")

      const page = await loader(
        createStubLoaderArgs({
          request: new Request(url)
        })
      )

      expect(page.prev).toBe(1)
    })

    describe("errors", () => {
      test("throws 404 Response when page is out of range", async () => {
        expect.hasAssertions()

        const url = new URL("http://localhost")
        url.searchParams.set("page", "3")

        try {
          await loader(createStubLoaderArgs({request: new Request(url)}))
        } catch (error) {
          if (!(error instanceof Response)) {
            throw error
          }

          expect(error.status).toBe(404)
        }
      })
    })
  })

  describe("common errors", () => {
    test("throws 404 Response when page param is 0", async () => {
      expect.hasAssertions()

      const url = new URL("http://localhost")
      url.searchParams.set("page", "0")

      try {
        await loader(createStubLoaderArgs({request: new Request(url)}))
      } catch (error) {
        if (!(error instanceof Response)) {
          throw error
        }

        expect(error.status).toBe(404)
      }
    })

    test("throws 404 Response when page param less than 0", async () => {
      expect.hasAssertions()

      const url = new URL("http://localhost")
      url.searchParams.set("page", "-124")

      try {
        await loader(createStubLoaderArgs({request: new Request(url)}))
      } catch (error) {
        if (!(error instanceof Response)) {
          throw error
        }

        expect(error.status).toBe(404)
      }
    })
  })
})
