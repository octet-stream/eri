import anyTest from "ava"

import isEmpty from "lodash/isEmpty"

import type {TestFn} from "ava"
import {ELEMENT_PARAGRAPH} from "@udecode/plate"

import type {WithTRPCContext} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import {withTRPC} from "server/__macro__/withTRPC"

import {runIsolatied} from "server/lib/db/orm"

import {Post, User} from "server/db/entity"

const test = anyTest as TestFn<WithTRPCContext>

test.before(async () => {
  await setup()

  await runIsolatied(async em => {
    const user = await em.create(User, {
      login: "johndoe",
      email: "john.doe@example.com",
      password: "someveryverylongpasswordbecausewhynot"
    })

    const posts = Array.from({length: 50}, (_, key) => em.create(Post, {
      title: `Test post #${key + 1}`,
      author: user,
      content: [
        {
          type: ELEMENT_PARAGRAPH,
          children: [
            {
              text: "This is the test post"
            }
          ]
        }
      ]
    }))

    await em.persistAndFlush(posts)
  })
})

test.after.always(cleanup)

test(
  "Returns list with 50 posts",

  withTRPC,

  async (t, trpc) => {
    const page = await trpc.posts.all()

    t.is(page.total, 1)
    t.is(page.rows, 50)
    t.is(page.prevCursor, null)
    t.is(page.nextCursor, null)
    t.false(isEmpty(page.items))
  }
)

test("Follows the limit parameter", withTRPC, async (t, trpc) => {
  const page = await trpc.posts.all({
    limit: 10,
    cursor: 1
  })

  t.is(page.total, 5)
})

test(
  "Has nextCursor param set to the next page number if there's one",

  withTRPC,

  async (t, trpc) => {
    const page = await trpc.posts.all({
      limit: 10,
      cursor: 1
    })

    t.is(page.nextCursor, 2)
  }
)

test(
  "Has nextCursor param being null if the last page is reached",

  withTRPC,

  async (t, trpc) => {
    const page = await trpc.posts.all({
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
    const page = await trpc.posts.all({
      limit: 10,
      cursor: 2
    })

    t.is(page.prevCursor, 1)
  }
)
