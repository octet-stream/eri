import test from "ava"

import {setup, cleanup} from "server/__helper__/database"
import {withTRPC} from "server/__macro__/withTRPC"

import {UserRoles, User} from "server/db/entity/User"

test.before(setup)

test.after.always(cleanup)

test("Creates a user with admin privilegies", withTRPC, async (t, trpc, orm) => {
  const created = await trpc.mutation("user.createSuper", {
    login: "admin",
    email: "admin@example.com",
    password: "adminadminadmin"
  })

  const user = await orm.em.findOne(User, created.id)

  t.not(user, null)
  t.is(user?.role, UserRoles.SUPER)
})
