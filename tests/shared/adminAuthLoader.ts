import type {UNSAFE_DataWithResponseInit as DataWithResponseInit} from "react-router"
import {expect, suite} from "vitest"
import {
  AdminLoaderErrorCode,
  type AdminLoaderErrorData
} from "../../app/server/lib/admin/adminLoaderError.js"
import type {Loader} from "../../app/server/lib/types/Loader.ts"
import {adminRouterTest} from "../fixtures/adminRouter.ts"
import {routerTest} from "../fixtures/router.ts"

/**
 * Creates a test suite for loaders that require admin authorization.
 * Use it to verify that the route has protection from public access
 *
 * @param loader - a loader to run tests for
 */
export const createAdminAuthLoaderSuite = (loader: Loader<any, any>) =>
  suite("admin auth loader", () => {
    routerTest("throws 401 with setup code", async ({routerStubs}) => {
      expect.hasAssertions()

      try {
        await loader(routerStubs.createLoaderArgs({}))
      } catch (error) {
        const response = error as DataWithResponseInit<AdminLoaderErrorData>

        expect(response.init?.status).toBe(401)
        expect(response.data).toEqual({
          type: "admin",
          code: AdminLoaderErrorCode.SETUP
        })
      }
    })

    adminRouterTest(
      "throws 401 with login code when admin account exist",

      async ({routerStubs}) => {
        expect.hasAssertions()

        try {
          await loader(routerStubs.createLoaderArgs({}) as any)
        } catch (error) {
          const response = error as DataWithResponseInit<AdminLoaderErrorData>

          expect(response.init?.status).toBe(401)
          expect(response.data).toEqual({
            type: "admin",
            code: AdminLoaderErrorCode.LOGIN
          })
        }
      }
    )
  })
