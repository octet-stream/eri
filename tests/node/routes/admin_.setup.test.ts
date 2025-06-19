import {faker} from "@faker-js/faker"
import {expect, suite} from "vitest"
import {action} from "../../../app/routes/admin_.setup/route.jsx"
import {User} from "../../../app/server/db/entities.js"
import {test} from "../../fixtures/orm.js"
import {createStubActionArgs} from "../../utils/createStubRouteArgs.js"

suite("action", () => {
  test("redirects to /admin upon success", async () => {
    expect.hasAssertions()

    const form = new FormData()

    form.set("email", faker.internet.exampleEmail())
    form.set("password", faker.internet.password({length: 8}))

    const request = new Request("http://localhost", {
      method: "post",
      body: form
    })

    try {
      await action(createStubActionArgs({request}))
    } catch (response) {
      if (!(response instanceof Response)) {
        throw response
      }

      expect(response.status).toBe(302)
      expect(response.headers.get("location")).toBe("/admin")
    }
  })

  test("creates a user", async ({orm}) => {
    expect.hasAssertions()

    const form = new FormData()
    const email = faker.internet.exampleEmail()

    form.set("email", email)
    form.set("password", faker.internet.password({length: 8}))

    const request = new Request("http://localhost", {
      method: "post",
      body: form
    })

    try {
      await action(createStubActionArgs({request}))
    } catch (error) {
      if (!(error instanceof Response)) {
        throw error
      }

      await expect(orm.em.findOne(User, {email})).resolves.not.toBeNull()
    }
  })

  test("returns error for incorrect email", async () => {
    const form = new FormData()

    form.set("email", "malformed email")
    form.set("password", faker.internet.password({length: 8}))

    const request = new Request("http://localhost", {
      method: "post",
      body: form
    })

    const response = await action(createStubActionArgs({request}))

    expect(response.init?.status).toBe(422)
    expect(Object.keys(response.data.error ?? {})).toEqual(["email"])
  })

  test("returns error for incorrect pasword", async () => {
    const form = new FormData()

    form.set("email", faker.internet.exampleEmail())
    form.set("password", "a")

    const request = new Request("http://localhost", {
      method: "post",
      body: form
    })

    const response = await action(createStubActionArgs({request}))

    expect(response.init?.status).toBe(422)
    expect(Object.keys(response.data.error ?? {})).toEqual(["password"])
    expect(response.data.error?.password).toEqual([
      "Password must be at least 8 characters long"
    ])
  })
})
