import type {
  User as DatabaseUser,
  Session as DatabaseSession
} from "better-auth"
import {BetterAuthError} from "better-auth"
import {nanoid} from "nanoid"
import {NIL} from "uuid"

import {faker} from "@faker-js/faker"

import {ormTest} from "../../../../scripts/vitest/fixtures/orm.js"

import {User} from "../../db/entities.js"
import {orm} from "../db/orm.js"

import {mikroOrmAdapter} from "./mikroOrmAdapter.js"
import {describe, expect} from "vitest"

const adapter = mikroOrmAdapter(orm)({
  advanced: {
    generateId: false
  }
})

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

describe("create", () => {
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
})

describe("findOne", () => {
  ormTest("Finds a record by id", async ({expect}) => {
    const user = orm.em.create(User, createRandomUser())

    await orm.em.persistAndFlush(user)

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
    const user = orm.em.create(User, createRandomUser())

    await orm.em.persistAndFlush(user)

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

  ormTest(
    "Returns null when querying nonexistent record",

    async ({expect}) => {
      const actual = await adapter.findOne<User>({
        model: "user",
        where: [
          {
            field: "email",
            value: "me@example.com"
          }
        ]
      })

      expect(actual).toBeNull()
    }
  )
})

describe("findMany", () => {
  ormTest("Finds many records", async ({expect}) => {
    orm.em.create(User, createRandomUser(), {persist: true})
    await orm.em.flush()

    const actual = await adapter.findMany<User>({
      model: "user"
    })

    expect(actual.length).toBe(1)
  })

  ormTest("Finds many statements with where statement", async ({expect}) => {
    const user = orm.em.create(User, createRandomUser())

    await orm.em.persistAndFlush(user)

    const actual = await adapter.findMany<User>({
      model: "user",
      where: [
        {
          field: "id",
          value: user.id
        }
      ]
    })

    expect(actual.length).toBe(1)
  })

  ormTest("Returns empty array if no records found", async () => {
    await expect(
      adapter.findMany<User>({
        model: "user"
      })
    ).resolves.toEqual([])
  })

  ormTest("Sorts the result according to sortBy value", async ({expect}) => {
    const users = ["a", "b"].map(value =>
      orm.em.create(User, {
        ...createRandomUser(),

        email: `${value}@example.com`
      })
    )

    await orm.em.persistAndFlush(users)

    const [user1, user2] = users

    const actual = await adapter.findMany<User>({
      model: "user",
      sortBy: {
        field: "email",
        direction: "desc"
      }
    })

    expect(actual.map(({email}) => email)).toEqual([user2.email, user1.email])
  })
})

ormTest("Updates existent entity", async ({expect}) => {
  const user = orm.em.create(User, createRandomUser())

  await orm.em.persistAndFlush(user)

  const expected = faker.internet.email()
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

describe("delete", () => {
  ormTest("Removes existent record by id", async ({expect}) => {
    const user = orm.em.create(User, createRandomUser())

    await orm.em.persistAndFlush(user)

    await adapter.delete({
      model: "user",
      where: [
        {
          field: "id",
          value: user.id
        }
      ]
    })

    await expect(orm.em.findOne(User, user.id)).resolves.toBeNull()
  })

  ormTest(
    "Does not throw an error when removing nonexistent record",

    async () => {
      await adapter.delete({
        model: "user",
        where: [
          {
            field: "id",
            value: NIL
          }
        ]
      })
    }
  )
})

describe("deleteMany", () => {
  ormTest("deletes many records", async () => {
    const users = Array.from({length: 3}, (_, index) =>
      orm.em.create(User, {
        ...createRandomUser(),

        email: `delete-${index}@example.com`
      })
    )

    await orm.em.persistAndFlush(users)

    const actual = await adapter.deleteMany({
      model: "user",
      where: [
        {
          field: "email",
          operator: "in",
          value: users.map(({email}) => email)
        }
      ]
    })

    expect(actual).toBe(users.length)
  })
})

describe("operators", () => {
  ormTest("Finds records with in operator", async ({expect}) => {
    const users = Array.from({length: 3}, () =>
      orm.em.create(User, createRandomUser())
    )

    await orm.em.persistAndFlush(users)

    const [user1, , user3] = users

    const actual = await adapter.findMany<User>({
      model: "user",
      where: [
        {
          field: "id",
          operator: "in",
          value: [user1.id, user3.id]
        }
      ]
    })

    expect(actual.length).toBe(2)
    expect(actual.map(user => user.id)).toEqual([user1.id, user3.id])
  })

  ormTest(
    "Throws an error when given value for $in operator is not an array",

    async ({expect}) => {
      try {
        await adapter.findOne<User>({
          model: "user",
          where: [
            {
              field: "id",
              value: NIL
            }
          ]
        })
      } catch (error) {
        const actual = error as BetterAuthError

        expect(actual).toBeInstanceOf(BetterAuthError)
        expect(actual.message).toBe(
          'Mikro ORM Adapter: The value for the field "id" must be an array when using the $in operator.'
        )
      }
    }
  )

  ormTest("Finds records using or connector", async ({expect}) => {
    const user = orm.em.create(User, createRandomUser())

    await orm.em.persistAndFlush(user)

    const actual = await adapter.findMany<User>({
      model: "user",
      where: [
        {
          field: "id",
          connector: "OR",
          value: user.id
        },
        {
          field: "email",
          connector: "OR",
          value: user.email
        }
      ]
    })

    expect(actual.length).toBe(1)
    expect(actual[0]).toMatchObject({id: user.id, email: user.email})
  })
})
