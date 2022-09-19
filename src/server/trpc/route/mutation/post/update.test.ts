import anyTest from "ava"

import type {TestFn} from "ava"
import type {TRPCError} from "@trpc/server"
import {ELEMENT_PARAGRAPH} from "@udecode/plate"

import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"

import {formatSlug} from "server/db/subscriber/PostSubscriber"
import {forkEntityManager} from "server/lib/db"
import {User, Post} from "server/db/entity"
import type {Value} from "lib/type/Editor"

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

test("Updates post title", withTRPC, async (t, trpc, orm) => {
  const {auth: user} = t.context

  const post = orm.em.create(Post, {
    author: user!,
    title: "Some post",
    content: [
      {
        type: ELEMENT_PARAGRAPH,
        children: [
          {
            text: "Test content"
          }
        ]
      }
    ]
  })

  await orm.em.persistAndFlush(post)

  const expected = "Some renamed post"

  const {title} = await trpc.mutation("post.update", {
    id: post.id,
    title: expected
  })

  t.is(title, expected)
})

test("Updates post slug on title update", withTRPC, async (t, trpc, orm) => {
  const {auth: user} = t.context

  const post = orm.em.create(Post, {
    author: user!,
    title: "Some post #2",
    content: [
      {
        type: ELEMENT_PARAGRAPH,
        children: [
          {
            text: "Test content"
          }
        ]
      }
    ]
  })

  await orm.em.persistAndFlush(post)

  const expected = "Some renamed post #2"

  const {slug, updatedAt} = await trpc.mutation("post.update", {
    id: post.id,
    title: expected
  })

  t.is(slug, formatSlug(expected, updatedAt))
})

test("Updates post content", withTRPC, async (t, trpc, orm) => {
  const {auth: user} = t.context

  const post = orm.em.create(Post, {
    author: user!,
    title: "Some post #3",
    content: [
      {
        type: ELEMENT_PARAGRAPH,
        children: [
          {
            text: "Test content"
          }
        ]
      }
    ]
  })

  await orm.em.persistAndFlush(post)

  const expected: Value = [
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: "Updated text"
        }
      ]
    }
  ]

  const {content: actual} = await trpc.mutation("post.update", {
    id: post.id,
    content: expected
  })

  t.deepEqual(actual, expected)
})

test("Throws an error when there's no such post", withTRPC, async (t, trpc) => {
  const trap = () => trpc.mutation("post.update", {
    id: "00000000-0000-0000-0000-000000000000",
    title: "Foo"
  })

  const error = await t.throwsAsync(trap) as TRPCError

  t.is(error.code, "NOT_FOUND")
})

test(
  "Throws an error if the user is not the post author",

  withTRPC,

  async (t, trpc, orm) => {
    const user = orm.em.create(User, {
      login: "some-editor",
      email: "some.editor@example.com",
      password: "somepassword"
    })

    const post = orm.em.create(Post, {
      author: user!,
      title: "Some post #2",
      content: [
        {
          type: ELEMENT_PARAGRAPH,
          children: [
            {
              text: "Test content"
            }
          ]
        }
      ]
    })

    await orm.em.persistAndFlush([user, post])

    const trap = () => trpc.mutation("post.update", {
      id: post.id,
      title: "Some post that wont be updated"
    })

    const error = await t.throwsAsync(trap) as TRPCError

    t.is(error.code, "FORBIDDEN")
  }
)
