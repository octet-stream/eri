import test from "ava"

import type {TRPCError} from "@trpc/server"
import type {ZodError} from "zod"

import {withTRPC} from "server/__macro__/withTRPC"
import {setup, cleanup} from "server/__helper__/database"

import {InvitationCode} from "server/db/entity/InvitationCode"
import {User} from "server/db/entity"

test.before(setup)

test.after.always(cleanup)

test("Creates a user", withTRPC, async (t, trpc, orm) => {
  const issuer = orm.em.create(User, {
    login: "noop",
    email: "noop@example.com",
    password: "noop"
  })

  const invitation = orm.em.create(InvitationCode, {
    issuer, email: "john.doe@example.com"
  })

  await orm.em.persistAndFlush([issuer, invitation])

  const created = await trpc.mutation("user.create", {
    code: invitation.code,
    login: "johndoe",
    email: "john.doe@example.com",
    password: "somepasswordphrase"
  })

  const actual = await orm.em.findOne(User, created.id)

  t.not(actual, null)

  await orm.em.removeAndFlush([issuer, actual])
})

test("Fails with incorrect code", withTRPC, async (t, trpc) => {
  const trap = () => trpc.mutation("user.create", {
    code: "aaaaaaaaaaaaaaaa",
    login: "johndoe",
    email: "john.doe@example.com",
    password: "somepasswordphrase"
  })

  const actual = await t.throwsAsync(trap) as TRPCError

  t.is(actual.code, "BAD_REQUEST")
  t.is(actual.message, "Invalid invitation code")
})

test("Fails without code", withTRPC, async (t, trpc) => {
  // @ts-ignore-error
  const trap = () => trpc.mutation("user.create", {
    login: "johndoe",
    email: "john.doe@example.com",
    password: "somepasswordphrase"
  })

  const error = await t.throwsAsync(trap) as TRPCError
  const {errors} = error.cause as ZodError
  const [actual] = errors

  t.is(actual.code, "invalid_type")
  t.is(actual.message, "Required")
})

test("Fails if code length is less then 16", withTRPC, async (t, trpc) => {
  const trap = () => trpc.mutation("user.create", {
    code: "a",
    login: "johndoe",
    email: "john.doe@example.com",
    password: "somepasswordphrase"
  })

  const error = await t.throwsAsync(trap) as TRPCError
  const {errors} = error.cause as ZodError
  const [actual] = errors

  t.is(actual.code, "too_small")
  t.is(actual.message, "Verification code must contain 16 characters")
})

test("Fails if code length is longer then 16", withTRPC, async (t, trpc) => {
  const trap = () => trpc.mutation("user.create", {
    code: "aaaaaaaaaaaaaaaaa",
    login: "johndoe",
    email: "john.doe@example.com",
    password: "somepasswordphrase"
  })

  const error = await t.throwsAsync(trap) as TRPCError
  const {errors} = error.cause as ZodError
  const [actual] = errors

  t.is(actual.code, "too_big")
  t.is(actual.message, "Verification code must contain 16 characters")
})

test("Fails if password is less than 8", withTRPC, async (t, trpc) => {
  const trap = () => trpc.mutation("user.create", {
    code: "aaaaaaaaaaaaaaaa",
    login: "johndoe",
    email: "john.doe@example.com",
    password: "a"
  })

  const error = await t.throwsAsync(trap) as TRPCError
  const {errors} = error.cause as ZodError
  const [actual] = errors

  t.is(actual.code, "too_small")
  t.is(actual.message, "Password must contain at least 8 characters")
})

test("Fails if invited user already exists", withTRPC, async (t, trpc, orm) => {
  const issuer = orm.em.create(User, {
    login: "noop1",
    email: "noop1@example.com",
    password: "noopnoopnoop"
  })

  const user = orm.em.create(User, {
    login: "maxdoe",
    email: "max.doe@example.com",
    password: "userpassword"
  })

  const invitation = orm.em.create(InvitationCode, {
    issuer, email: "max.doe@example.com"
  })

  await orm.em.persistAndFlush([issuer, user, invitation])

  const trap = () => trpc.mutation("user.create", {
    login: "maxdoe",
    email: "max.doe@example.com",
    password: "userpassword",
    code: invitation.code
  })

  const error = await t.throwsAsync(trap) as TRPCError

  t.is(error.code, "BAD_REQUEST")
  t.is(error.message, "User already exists")
})

test(
  "Fails if given email mismatches one from the invitation",

  withTRPC,

  async (t, trpc, orm) => {
    const issuer = orm.em.create(User, {
      login: "noop42",
      email: "noop42@example.com",
      password: "noopnoopnoop"
    })

    const invitation = orm.em.create(InvitationCode, {
      issuer, email: "max.doe42@example.com"
    })

    await orm.em.persistAndFlush([issuer, invitation])

    const trap = () => trpc.mutation("user.create", {
      login: "maxdoe3",
      email: "max.doe3@example.com",
      password: "userpassword",
      code: invitation.code
    })

    const error = await t.throwsAsync(trap) as TRPCError

    t.is(error.code, "BAD_REQUEST")
    t.is(error.message, "Email mismatch")
  }
)
