import anyTest from "ava"

import type {TestFn} from "ava"
import type {ZodError} from "zod"
import {TRPCError} from "@trpc/server"
import {ELEMENT_PARAGRAPH} from "@udecode/plate"

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
      type: ELEMENT_PARAGRAPH,
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

test(
  "Throws an error when creating post with empty content",

  withTRPC,

  async (t, trpc) => {
    const trap = () => trpc.mutation("post.create", {
      title: "This post is empty",
      content: []
    })

    const error = await t.throwsAsync(trap) as TRPCError
    const {errors} = error.cause as ZodError
    const [actual] = errors

    t.is(actual.code, "custom")
    t.is(actual.message, "Post content must be of at least one Node element")
  }
)

test(
  "Throws an error when creating post with just one empty paragraph",

  withTRPC,

  async (t, trpc) => {
    const trap = () => trpc.mutation("post.create", {
      title: "This post is empty",
      content: [
        {
          type: ELEMENT_PARAGRAPH,
          children: [
            {
              text: ""
            }
          ]
        }
      ]
    })

    const error = await t.throwsAsync(trap) as TRPCError
    const {errors} = error.cause as ZodError
    const [actual] = errors

    t.is(actual.code, "custom")
    t.is(actual.message, "Post content must be of at least one Node element")
  }
)
