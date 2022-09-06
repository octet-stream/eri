import anyTest from "ava"

import type {TestFn} from "ava"

import type {Value} from "lib/type/Editor"

import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"

import {formatSlug} from "server/db/subscriber/PostSubscriber"
import {forkEntityManager} from "server/lib/db"
import {User, Post} from "server/db/entity"

const test = anyTest as TestFn<WithTRPCContext>

test.before(async t => {
  await setup()

  const em = await forkEntityManager()

  const user = em.create(User, {
    login: "admin",
    email: "admin@example.com",
    password: "adminadminadmin"
  })

  await em.persistAndFlush(user)

  t.context.auth = user
})

test.after.always(cleanup)

test("Createas a post", withTRPC, async (t, trpc, orm) => {
  const expectedTitle = "Test post"
  const expectedContent: Value = [
    {
      type: "p",
      children: [
        {
          text: "Test content"
        }
      ]
    }
  ]

  const actual = await trpc.mutation("post.create", {
    title: expectedTitle,
    content: expectedContent
  })

  await t.notThrowsAsync(() => orm.em.findOneOrFail(Post, actual.id))

  t.is(actual.title, expectedTitle)
  t.is(actual.slug, formatSlug(expectedTitle, actual.createdAt))
  t.deepEqual(actual.content, expectedContent)
})
