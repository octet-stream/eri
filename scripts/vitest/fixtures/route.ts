import type {LoaderFunctionArgs} from "@remix-run/node"

import {userTest} from "./user.js"

export interface RouteTestContext {
  loaderArgs: LoaderFunctionArgs
}

export const routeTest = userTest.extend<RouteTestContext>({
  async loaderArgs({orm}, use) {
    const request = new Request("http://localhost")
    const params = {}
    const context = {orm, auth: null as any} // TODO: Mock auth context for private routes

    await use({context, request, params})
  }
})
