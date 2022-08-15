import test from "ava"

import {withORM} from "server/__macro__/withORM"
import {setup, cleanup} from "server/__helper__/database"

import {InvitationCode} from "server/db/entity/InvitationCode"
import {router} from "server/trpc/route"
import {User} from "server/db/entity"

const caller = router.createCaller({})

test.before(setup)

test("Creates a new user", withORM, async (t, orm) => {
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

test.after.always(cleanup)
