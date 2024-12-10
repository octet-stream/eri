import {faker} from "@faker-js/faker"
import {expect} from "vitest"

import {routeTest} from "../../scripts/vitest/fixtures/route.js"
import {createNodeId} from "../server/zod/plate/utils/nodeId.js"

import {Post} from "../server/db/entities.js"
import {loader} from "./_blog.posts.$date.$name.jsx"

routeTest("throws 404 response for unknown post", async ({loaderArgs}) => {
  expect.hasAssertions()

  loaderArgs.params = {date: "2024-10-07", name: "test~123ab"}

  try {
    await loader(loaderArgs as any)
  } catch (error) {
    if (!(error instanceof Response)) {
      throw error
    }

    expect(error.status).toBe(404)
    expect(error.statusText).toBe("Unable to find post")
  }
})

// TODO: PlateView
routeTest.fails(
  "returns post by given name and date params",

  async ({loaderArgs, orm, user}) => {
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
    loaderArgs.params = {date, name}

    const result = await loader(loaderArgs as any)

    expect(result.id).toBe(post.id)
  }
)
