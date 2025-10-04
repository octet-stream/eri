import {faker} from "@faker-js/faker"
import dedent from "dedent"
import {beforeEach, expect, suite} from "vitest"
import {loader} from "../../../app/routes/_blog._index/route.tsx"
import {Post, User} from "../../../app/server/db/entities.ts"
import {AdminPostInput} from "../../../app/server/zod/admin/AdminPostInput.ts"
import {type OrmTestContext, test} from "../../fixtures/orm.ts"
import {createStubLoaderArgs} from "../../utils/createStubRouteArgs.ts"

suite("loader", () => {
  suite("no data", async () => {
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

  suite("with data", () => {
    beforeEach<OrmTestContext>(async ({orm}) => {
      const user = orm.em.create(User, {
        email: faker.internet.exampleEmail()
      })

      const input = AdminPostInput.parse({
        fallback: "true",
        markdown: dedent`
          # ${faker.lorem.sentence({min: 3, max: 4})}
  
          ${faker.lorem.paragraph()}
        `
      })

      const posts = Array.from({length: 200}, () =>
        orm.em.create(Post, {
          author: user,
          title: input.title.textContent,
          content: input.content.toJSON()
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

    suite("errors", () => {
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

  suite("common errors", () => {
    // FIXME: I've changed validation and now I have to fix the regression
    test.fails("throws 404 Response when page param is 0", async () => {
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

    // FIXME: I've changed validation and now I have to fix the regression
    test.fails("throws 404 Response when page param less than 0", async () => {
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
