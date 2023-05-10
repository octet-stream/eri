import anyTest from "ava"

import {NIL, v4} from "uuid"
import type {TestFn} from "ava"
import type {TRPCError} from "@trpc/server"
import {ELEMENT_PARAGRAPH} from "@udecode/plate"

import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"

import type {IEditorData} from "server/trpc/type/common/EditorData"
import {runIsolatied} from "server/lib/db/orm"
import {User, Post} from "server/db/entity"

const test = anyTest as TestFn<WithTRPCContext>

test.before(async t => {
  await setup()

  const auth = await runIsolatied(async em => {
    const user = em.create(User, {
      login: "admin",
      email: "admin@example.com",
      password: "adminadminadmin"
    })

    await em.persistAndFlush(user)

    return user
  })

  t.context.auth = auth
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

  const {title} = await trpc.post.update({
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

  const {slug: actual} = await trpc.post.update({
    id: post.id,
    title: "Some renamed post #2"
  })

  const {slug: expected} = await orm.em.findOneOrFail(Post, post.id, {
    disableIdentityMap: true
  })

  t.not(actual, post.slug)
  t.is(actual, expected)
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

  const expected: IEditorData = [
    {
      id: v4(),
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          id: v4(),
          text: "Updated text"
        }
      ]
    }
  ]

  const {content: actual} = await trpc.post.update({
    id: post.id,
    content: expected
  })

  t.deepEqual(actual, expected)
})

test("Throws an error when there's no such post", withTRPC, async (t, trpc) => {
  const trap = () => trpc.post.update({
    id: NIL,
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

    const trap = () => trpc.post.update({
      id: post.id,
      title: "Some post that wont be updated"
    })

    const error = await t.throwsAsync(trap) as TRPCError

    t.is(error.code, "FORBIDDEN")
  }
)
