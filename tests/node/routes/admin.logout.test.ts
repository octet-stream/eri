import type {SetCookie} from "cookie-es"
import {expect, suite} from "vitest"
import {action} from "../../../app/routes/admin.logout.js"
import {auth} from "../../../app/server/lib/auth/auth.js"
import {test} from "../../fixtures/admin.js"
import {createStubActionArgs} from "../../utils/createStubRouteArgs.js"
import {getCookies} from "../../utils/getCookies.js"

suite("action", () => {
  test("throws redirect response", async ({admin}) => {
    expect.hasAssertions()

    try {
      await action(createStubActionArgs({request: admin.request}))
    } catch (response) {
      if (!(response instanceof Response)) {
        throw response
      }

      expect(response.status).toBe(302)
    }
  })

  test("resets session cookie", async ({admin}) => {
    expect.hasAssertions()

    try {
      await action(createStubActionArgs({request: admin.request}))
    } catch (response) {
      if (!(response instanceof Response)) {
        throw response
      }

      expect(response.headers.has("set-cookie")).toBe(true)

      const cookies = getCookies(response.headers)
      const ctx = await auth.$context

      expect(cookies.get(ctx.authCookies.sessionToken.name)).toMatchObject({
        maxAge: 0,
        value: ""
      } satisfies Partial<SetCookie>)
    }
  })
})
