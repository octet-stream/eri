import anyTest from "ava"

import type {TestFn} from "ava"
import type {TRPCError} from "@trpc/server"

import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"
import {withTRPC} from "server/__macro__/withTRPC"

import {User, Post} from "server/db/entity"

const test = anyTest as TestFn<WithTRPCContext>

test.before(setup)

test.after.always(cleanup)

test("Fails if requested post is not found", withTRPC, async (t, trpc) => {
  const trap = () => trpc.query("post.getBySlug", {
    slug: ["1970-01-01", "this-post-does-not-exists"]
  })

  const actual = await t.throwsAsync(trap) as TRPCError

  t.is(actual.code, "NOT_FOUND")
  t.is(actual.message, "Can't find a post")
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
    content: {
      blocks: [
        {
          type: "paragraph",
          data: {
            text: "This is the test post"
          }
        }
      ]
    }
  })

  await orm.em.persistAndFlush([user, post])

  const [date, name] = post.slug.split("/")
  const actual = await trpc.query("post.getBySlug", {
    slug: [date, name]
  })

  t.is(actual.id, post.id)
})
