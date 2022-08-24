import anyTest from "ava"

import {isEmpty} from "lodash"
import type {TestFn} from "ava"

import type {WithTRPCContext} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import {withTRPC} from "server/__macro__/withTRPC"
import {withORM} from "server/__macro__/withORM"

import {Post, User} from "server/db/entity"

const test = anyTest as TestFn<WithTRPCContext>

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
test.before(withORM, async (_, orm) => {
  await setup()

  const user = orm.em.create(User, {
    login: "johndoe",
    email: "john.doe@example.com",
    password: "someveryverylongpasswordbecausewhynot"
  })

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const posts = Array.from({length: 50}, (_, key) => orm.em.create(Post, {
    title: `Test post #${key + 1}`,
    author: user,
    content: {
      blocks: [
        {
          type: "paragraph",
          data: {}
        }
      ]
    }
  }))

  await orm.em.persistAndFlush(posts)
})

test.after.always(cleanup)

test(
  "Returns empty list with 50 posts",

  withTRPC,

  async (t, trpc) => {
    const page = await trpc.query("posts.all")

    t.is(page.total, 1)
    t.is(page.rows, 50)
    t.is(page.prevCursor, null)
    t.is(page.nextCursor, null)
    t.false(isEmpty(page.items))
  }
)

test("Follows the limit parameter", withTRPC, async (t, trpc) => {
  const page = await trpc.query("posts.all", {
    limit: 10,
    cursor: 1
  })

  t.is(page.total, 5)
})

test(
  "Has nextCursor param set to the next page number if there's one",

  withTRPC,

  async (t, trpc) => {
    const page = await trpc.query("posts.all", {
      limit: 10,
      cursor: 1
    })

    t.is(page.nextCursor, 2)
  }
)

test.only(
  "Has nextCursor param being null if the last page is reached",

  withTRPC,

  async (t, trpc) => {
    const page = await trpc.query("posts.all", {
      limit: 10,
      cursor: 5
    })

    t.is(page.nextCursor, null)
  }
)

test(
  "Has prevCursor param set to the prev page number if there's one",

  withTRPC,

  async (t, trpc) => {
    const page = await trpc.query("posts.all", {
      limit: 10,
      cursor: 2
    })

    t.is(page.prevCursor, 1)
  }
)
