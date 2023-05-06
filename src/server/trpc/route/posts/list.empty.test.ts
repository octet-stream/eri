import anyTest from "ava"

import type {TestFn} from "ava"

import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"
import {withTRPC} from "server/__macro__/withTRPC"

const test = anyTest as TestFn<WithTRPCContext>

test.before(setup)

test.after.always(cleanup)

test(
  "Returns empty list when there's no posts",

  withTRPC,

  async (t, trpc) => {
    const page = await trpc.posts.list()

    t.is(page.pagesCount, 1)
    t.is(page.itemsCount, 0)
    t.is(page.prevCursor, null)
    t.is(page.nextCursor, null)
    t.deepEqual(page.items, [])
  }
)
