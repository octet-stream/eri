import {expect, suite} from "vitest"
import {action} from "../../../app/routes/admin_.login/route.jsx"
import {auth} from "../../../app/server/lib/auth/auth.js"
import {test} from "../../fixtures/admin.js"
import {createStubActionArgs} from "../../utils/createStubRouteArgs.js"
import {getCookies} from "../../utils/getCookies.js"

suite("action", () => {
  test("redirects to /admin on success", async ({admin}) => {
    expect.hasAssertions()

    const form = new FormData()

    form.set("email", admin.viewer.email)
    form.set("password", admin.password)

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

  test("returns session cookie", async ({admin}) => {
    expect.hasAssertions()

    const ctx = await auth.$context

    const expected = ctx.authCookies.sessionToken.name

    const form = new FormData()

    form.set("email", admin.viewer.email)
    form.set("password", admin.password)

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

      expect(response.headers.has("set-cookie")).toBe(true)

      const actual = getCookies(response.headers)

      expect(actual.has(expected)).toBe(true)
    }
  })

  test("returns error for incorrect email", async ({admin}) => {
    const form = new FormData()

    form.set("email", "malformed email")
    form.set("password", admin.password)

    const request = new Request("http://localhost", {
      method: "post",
      body: form
    })

    const response = await action(createStubActionArgs({request}))

    expect(response.init?.status).toBe(422)
    expect(Object.keys(response.data.error ?? {})).toEqual(["email"])
  })

  test("returns error for incorrect password", async ({admin}) => {
    const form = new FormData()

    form.set("email", admin.viewer.email)
    form.set("password", "1")

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

  test("returns form error when user is not found", async ({admin}) => {
    const form = new FormData()

    form.set("email", "test@example.com")
    form.set("password", admin.password)

    const request = new Request("http://localhost", {
      method: "post",
      body: form
    })

    const response = await action(createStubActionArgs({request}))

    expect(response.init?.status).toBe(401)
    expect(Object.keys(response.data.error ?? {})).toEqual([""])
    expect(response.data.error?.[""]).toEqual(["Invalid email or password"])
  })

  test("throws form error for wrong password", async ({admin}) => {
    const form = new FormData()

    form.set("email", admin.viewer.email)
    form.set("password", `${admin.password}abc`)

    const request = new Request("http://localhost", {
      method: "post",
      body: form
    })

    const response = await action(createStubActionArgs({request}))

    expect(response.init?.status).toBe(401)
    expect(Object.keys(response.data.error ?? {})).toEqual([""])
    expect(response.data.error?.[""]).toEqual(["Invalid email or password"])
  })
})
