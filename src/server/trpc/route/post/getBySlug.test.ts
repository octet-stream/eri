import anyTest from "ava"

import type {TestFn} from "ava"
import {TRPCError} from "@trpc/server"
import {ELEMENT_PARAGRAPH} from "@udecode/plate"

import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"
import {withTRPC} from "server/__macro__/withTRPC"

import {User, Post} from "server/db/entity"

const test = anyTest as TestFn<WithTRPCContext>

test.before(setup)

test.after.always(cleanup)

test.serial("Fails if post is not found", withTRPC, async (t, trpc) => {
  const trap = () => trpc.post.getBySlug({
    slug: ["1970-01-01", "this-post-does-not-exists~123ac"]
  })

  await t.throwsAsync(trap, {
    instanceOf: TRPCError,
    code: "NOT_FOUND"
  })
})

test("Returns requested post", withTRPC, async (t, trpc, orm) => {
  const user = orm.em.create(User, {
    login: "johndoe",
    email: "john.doe@example.com",
    password: "someveryverylongpasswordbecausewhynot"
  })

  const post = orm.em.create(Post, {
    title: "Test post",
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
  })

  await orm.em.persistAndFlush([user, post])

  const [date, name] = post.slug.split("/")
  const actual = await trpc.post.getBySlug({
    slug: [date, name]
  })

  t.is(actual.id, post.id)
})
