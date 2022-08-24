import anyTest from "ava"

import type {TestFn} from "ava"
import {TRPCError} from "@trpc/server"

import {setup, cleanup} from "server/__helper__/database"
import type {WithTRPCContext} from "server/__macro__/withTRPC"
import {withTRPC} from "server/__macro__/withTRPC"

import {UserRoles, User} from "server/db/entity/User"

const test = anyTest as TestFn<WithTRPCContext>

test.before(setup)

test.after.always(cleanup)

test.serial("Creates a user with admin role", withTRPC, async (t, trpc, orm) => {
  const created = await trpc.mutation("user.createSuper", {
    login: "admin",
    email: "admin@example.com",
    password: "adminadminadmin"
  })

  const user = await orm.em.findOneOrFail(User, created.id)

  t.not(user, null)
  t.is(user.role, UserRoles.SUPER)

  await orm.em.removeAndFlush(user)
})

test("Fails if super user already exists", withTRPC, async (t, trpc, orm) => {
  const user = orm.em.create(User, {
    login: "admin",
    email: "admin@example.com",
    password: "adminadminadmin",
    role: UserRoles.SUPER
  })

  await orm.em.persistAndFlush(user)

  const trap = () => trpc.mutation("user.createSuper", {
    login: "admin",
    email: "admin@example.com",
    password: "adminadminadmin"
  })

  const error = await t.throwsAsync(trap) as TRPCError

  t.is(error.code, "NOT_FOUND")
})
