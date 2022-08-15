import test from "ava"

import type {TRPCError} from "@trpc/server"

import {withORM} from "server/__macro__/withORM"
import {setup, cleanup} from "server/__helper__/database"

import {InvitationCode} from "server/db/entity/InvitationCode"
import {router} from "server/trpc/route"
import {User} from "server/db/entity"

const caller = router.createCaller({})

test.before(setup)

test.after.always(cleanup)

test("Creates a user", withORM, async (t, orm) => {
  const issuer = orm.em.create(User, {
    login: "noop",
    email: "noop@example.com",
    password: "noop"
  })

  const invitation = orm.em.create(InvitationCode, {
    issuer, email: "john.doe@example.com"
  })

  await orm.em.persistAndFlush([issuer, invitation])

  const created = await caller.mutation("user.create", {
    code: invitation.code,
    login: "johndoe",
    email: "john.doe@example.com",
    password: "somepasswordphrase"
  })

  const actual = await orm.em.findOne(User, created.id)

  t.not(actual, null)

  await orm.em.removeAndFlush([issuer, actual])
})

test("Fails to create a user with incorrect code", async t => {
  const trap = () => caller.mutation("user.create", {
    code: "aaaaaaaaaaaaaaaa",
    login: "johndoe",
    email: "john.doe@example.com",
    password: "somepasswordphrase"
  })

  const error = await t.throwsAsync(trap) as TRPCError

  t.is(error.code, "BAD_REQUEST")
  t.is(error.message, "Invalid invitation code")
})
