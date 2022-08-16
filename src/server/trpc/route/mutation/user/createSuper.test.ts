import test from "ava"

import {noop} from "lodash"

import {setup, cleanup} from "server/__helper__/database"
import {withORM} from "server/__macro__/withORM"

import {router} from "server/trpc/route"
import {UserRoles, User} from "server/db/entity/User"

const caller = router.createCaller({req: {}, res: {revalidate: noop}})

test.before(setup)

test.after.always(cleanup)

test("Creates a user with admin privilegies", withORM, async (t, orm) => {
  const created = await caller.mutation("user.createSuper", {
    login: "admin",
    email: "admin@example.com",
    password: "adminadminadmin"
  })

  const user = await orm.em.findOne(User, created.id)

  t.not(user, null)
  t.is(user?.role, UserRoles.SUPER)
})
