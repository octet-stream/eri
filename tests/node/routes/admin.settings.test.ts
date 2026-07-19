import type {SubmissionResult} from "@conform-to/react"
import type {UNSAFE_DataWithResponseInit as DataWithResponseInit} from "react-router"
import {expect, suite} from "vitest"

import {action} from "#app/routes/admin.settings/route.tsx"
import {Account} from "#app/server/db/entities.ts"

import {test} from "#tests/fixtures/adminRouter.ts"

suite("action", () => {
  test("updates email", async ({admin, orm, routerStubs}) => {
    const expectedEmail = "me+test@example.com"
    const form = new FormData()

    form.set("intent", "info")
    form.set("email", expectedEmail)

    const request = new Request(admin.request, {
      method: "POST",
      body: form
    })

    await action(routerStubs.createActionArgs({request}))
    const actual = await orm.em.refreshOrFail(admin.viewer)

    expect(actual.email).toBe(expectedEmail)
  })

  test("updates password", async ({admin, orm, auth, routerStubs}) => {
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

    await action(routerStubs.createActionArgs({request}))

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
      admin,
      routerStubs
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
        await action(routerStubs.createActionArgs({request}))
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
