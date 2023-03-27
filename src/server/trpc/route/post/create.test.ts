import anyTest from "ava"

import type {TestFn} from "ava"
import {ELEMENT_PARAGRAPH} from "@udecode/plate"

import type {IEditorData} from "server/trpc/type/common/EditorData"

import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"

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
  const expectedContent: IEditorData = [
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: "Test content",
        }
      ]
    }
  ]

  const actual = await trpc.post.create({
    title: expectedTitle,
    content: expectedContent
  })

  const expected = await orm.em.findOneOrFail(Post, actual.id)

  t.is(actual.title, expected.title)
  t.is(actual.slug, expected.slug)
  t.deepEqual(actual.content, expected.content)
})
