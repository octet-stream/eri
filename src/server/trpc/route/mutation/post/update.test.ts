import anyTest from "ava"

import type {TestFn} from "ava"
import {ELEMENT_PARAGRAPH} from "@udecode/plate"

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
