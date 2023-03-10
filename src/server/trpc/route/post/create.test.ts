import anyTest from "ava"

import type {TestFn} from "ava"
import {ELEMENT_PARAGRAPH} from "@udecode/plate"

import type {Value} from "lib/type/Editor"

import {omitId} from "server/__helper__/omitId"
import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"

import {formatSlug} from "server/db/subscriber/PostSubscriber"
import {User, Post} from "server/db/entity"
import {runIsolatied} from "server/lib/db/orm"

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

  const actual = await trpc.post.create({
    title: expectedTitle,
    content: expectedContent
  })

  await t.notThrowsAsync(() => orm.em.findOneOrFail(Post, actual.id))

  t.is(actual.title, expectedTitle)
  t.is(actual.slug, formatSlug(expectedTitle, actual.createdAt))
  t.deepEqual(
    actual.content.map(element => ({
      ...omitId(element),

      children: element.children.map(omitId)
    })),

    expectedContent
  )
})
