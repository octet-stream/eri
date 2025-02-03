import type {SetCookie} from "cookie-es"
import {expect} from "vitest"

import {auth} from "../../../app/server/lib/auth/auth.js"
import {test} from "../../fixtures/admin.js"
import {createStubLoaderArgs} from "../../utils/createStubRouteArgs.js"
import {getCookies} from "../../utils/getCookies.js"

import {loader} from "../../../app/routes/admin.logout.js"

test("throws redirect response", async ({admin}) => {
  expect.hasAssertions()

  try {
    await loader(createStubLoaderArgs({request: admin.request}))
  } catch (error) {
    const response = error as Response

    expect(response).toBeInstanceOf(Response)
    expect(response.status).toBe(302)
  }
})

test("resets session cookie", async ({admin}) => {
  expect.hasAssertions()

  try {
    await loader(createStubLoaderArgs({request: admin.request}))
  } catch (error) {
    const response = error as Response

    expect(response.headers.has("set-cookie")).toBe(true)

    const cookies = getCookies(response.headers)
    const ctx = await auth.$context

    expect(cookies.get(ctx.authCookies.sessionToken.name)).toMatchObject({
      maxAge: 0,
      value: ""
    } satisfies Partial<SetCookie>)
  }
})
