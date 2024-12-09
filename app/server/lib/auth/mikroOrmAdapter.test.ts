import type {
  User as DatabaseUser,
  Session as DatabaseSession
} from "better-auth"
import {nanoid} from "nanoid"

import {faker} from "@faker-js/faker"

import {ormTest} from "../../../../scripts/vitest/fixtures/orm.js"

import {User} from "../../db/entities.js"
import {orm} from "../db/orm.js"

import {mikroOrmAdapter} from "./mikroOrmAdapter.js"

const adapter = mikroOrmAdapter(orm)({})

interface UserInput {
  email: string
  name: string
}

interface SessionInput {
  token: string
  userId: string
  expiresAt: Date
}

function createRandomUser(): UserInput {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const name = [firstName, lastName].join(" ")
  const email = faker.internet.email({firstName, lastName})

  return {email, name}
}

ormTest("Creates a new record", async ({expect}) => {
  const expected = createRandomUser()
  const actual = await adapter.create({data: expected, model: "user"})

  expect(actual.email).toBe(expected.email)
})

ormTest("Creates a record with referenced entity", async ({expect}) => {
  const user = await adapter.create<UserInput, DatabaseUser>({
    model: "user",
    data: createRandomUser()
  })

  const actual = await adapter.create<SessionInput, DatabaseSession>({
    model: "session",
    data: {
      token: nanoid(),
      userId: user.id,
      expiresAt: new Date()
    }
  })

  expect(actual.userId).toBe(user.id)
})

ormTest("Finds a record by id", async ({expect}) => {
  const user = await adapter.create<UserInput, DatabaseUser>({
    model: "user",
    data: createRandomUser()
  })

  const actual = await adapter.findOne<DatabaseUser>({
    model: "user",
    where: [
      {
        field: "id",
        value: user.id
      }
    ]
  })

  expect(actual?.id).toBe(user.id)
})

ormTest("Finds a record without id", async ({expect}) => {
  const user = await adapter.create<UserInput, DatabaseUser>({
    model: "user",
    data: createRandomUser()
  })

  const actual = await adapter.findOne<DatabaseUser>({
    model: "user",
    where: [
      {
        field: "email",
        value: user.email
      }
    ]
  })

  expect(actual?.id).toBe(user.id)
})

ormTest("Updates existent entity", async ({expect}) => {
  const expected = faker.internet.email()
  const user = await adapter.create<UserInput, DatabaseUser>({
    model: "user",
    data: createRandomUser()
  })

  const actual = await adapter.update<DatabaseUser>({
    model: "user",
    where: [
      {
        field: "id",
        value: user.id
      }
    ],
    update: {
      email: expected
    }
  })

  expect({id: actual?.id, email: actual?.email}).toEqual({
    id: user.id,
    email: expected
  })
})

ormTest("Removes existent record by id", async ({expect}) => {
  const user = await adapter.create<UserInput, DatabaseUser>({
    model: "user",
    data: createRandomUser()
  })

  await adapter.delete({
    model: "user",
    where: [
      {
        field: "id",
        value: user.id
      }
    ]
  })

  expect(orm.em.findOne(User, user.id)).resolves.toBeNull()
})
