import type {SubmissionResult} from "@conform-to/react"
import type {UNSAFE_DataWithResponseInit as DataWithResponseInit} from "react-router"
import {expect, suite} from "vitest"

import {action} from "../../../app/routes/admin.settings/route.tsx"
import {Account} from "../../../app/server/db/entities.ts"
import {auth} from "../../../app/server/lib/auth/auth.ts"
import {test} from "../../fixtures/admin.ts"
import {createStubActionArgs} from "../../utils/createStubRouteArgs.ts"

suite("action", () => {
  test("updates email", async ({admin, orm}) => {
    const expectedEmail = "me+test@example.com"
    const form = new FormData()

    form.set("intent", "info")
    form.set("email", expectedEmail)

    const request = new Request(admin.request, {
      method: "POST",
      body: form
    })

    const response = await action(createStubActionArgs({request}))

    const actual = await orm.em.refreshOrFail(admin.viewer)

    expect(actual.email).toBe(expectedEmail)

    // Also check if headers updated
    expect(response.init?.headers).toBeDefined()
    expect(new Headers(response.init?.headers).has("set-cookie")).toBe(true)
  })

  test("updates password", async ({admin, orm}) => {
    const expectedPassword = "wow-so-secure-much-password"

    const form = new FormData()

    form.set("intent", "password")
    form.set("current", admin.password)
    form.set("updated", expectedPassword)
    form.set("confirm", expectedPassword)

    const request = new Request(admin.request, {
      method: "POST",
      body: form
    })

    await action(createStubActionArgs({request}))

    const {password: actualPassword} = await orm.em.findOneOrFail(Account, {
      user: admin.viewer,
      providerId: "credential"
    })

    if (!actualPassword) {
      expect.fail("User has no password on their credential account")
    }

    await expect(
      auth.options.emailAndPassword.password.verify({
        hash: actualPassword,
        password: expectedPassword
      })
    ).resolves.toBe(true)
  })

  suite("errors", () => {
    test("when updated and confirmation password aren't the same", async ({
      admin
    }) => {
      expect.hasAssertions()

      const form = new FormData()

      form.set("intent", "password")
      form.set("current", admin.password)
      form.set("updated", "some-password")
      form.set("confirm", "some-password-that-doesnt-match")

      const request = new Request(admin.request, {
        method: "POST",
        body: form
      })

      try {
        await action(createStubActionArgs({request}))
      } catch (error) {
        const response = error as DataWithResponseInit<SubmissionResult>

        expect(response.init?.status).toBe(422)
        expect(response.data.error?.[""]).toMatchObject([
          "Updated and confirmation passwords should be the same"
        ])
      }
    })
  })
})
