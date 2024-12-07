import {betterAuth} from "better-auth"
import {describe} from "vitest"

import {faker} from "@faker-js/faker"

import {ormTest} from "../../../../scripts/vitest/fixtures/orm.js"

import {orm} from "../db/orm.js"

import {mikroOrmAdapter} from "./mikroOrmAdapter.js"

const auth = betterAuth({
  database: mikroOrmAdapter(orm),
  emailAndPassword: {
    enabled: true
  },
  advanced: {
    generateId: false
  }
})

describe("Signup", () => {
  ormTest("Creates a user", async ({expect}) => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const name = [firstName, lastName].join(" ")
    const email = faker.internet.email({firstName, lastName}).toLowerCase()
    const password = faker.internet.password({length: 20})

    const {user} = await auth.api.signUpEmail({
      body: {
        email,
        name,
        password
      }
    })

    expect(user.email).toBe(email)
  })

  ormTest("Creates a session", async ({expect}) => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const name = [firstName, lastName].join(" ")
    const email = faker.internet.email({firstName, lastName}).toLowerCase()
    const password = faker.internet.password({length: 20})

    const {session} = await auth.api.signUpEmail({
      body: {
        email,
        name,
        password
      }
    })

    expect(session).not.toBeNull()
  })

  ormTest("Logins newly created user by default", async ({expect}) => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const name = [firstName, lastName].join(" ")
    const email = faker.internet.email({firstName, lastName}).toLowerCase()
    const password = faker.internet.password({length: 20})

    const response = await auth.api.signUpEmail({
      asResponse: true,
      body: {
        email,
        name,
        password
      }
    })

    expect(response.headers.has("set-cookie")).toBe(true)
  })
})

ormTest("Can log in", async ({expect}) => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const name = [firstName, lastName].join(" ")
  const email = faker.internet.email({firstName, lastName}).toLowerCase()
  const password = faker.internet.password({length: 20})

  await auth.api.signUpEmail({
    asResponse: true,
    body: {
      name,
      email,
      password
    }
  })

  const response = await auth.api.signInEmail({
    asResponse: true,
    body: {
      email,
      password
    }
  })

  expect(response.headers.has("set-cookie")).toBe(true)
})

ormTest("Returns session for current user", async ({expect}) => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const name = [firstName, lastName].join(" ")
  const email = faker.internet.email({firstName, lastName}).toLowerCase()
  const password = faker.internet.password({length: 20})

  const response = await auth.api.signUpEmail({
    asResponse: true,
    body: {
      name,
      email,
      password
    }
  })

  const headers = new Headers()

  headers.set("cookie", response.headers.get("set-cookie") as string)

  const result = await auth.api.getSession({
    headers
  })

  expect(result).not.toBeNull()
})
