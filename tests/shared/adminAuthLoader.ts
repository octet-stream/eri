import type {
  AppLoadContext,
  UNSAFE_DataWithResponseInit as DataWithResponseInit,
  LoaderFunctionArgs
} from "react-router"
import {describe, expect} from "vitest"

import {adminTest} from "../fixtures/admin.js"
import {ormTest} from "../fixtures/orm.js"
import {createStubLoaderArgs} from "../utils/createStubRouteArgs.js"

import type {Replace} from "../../app/lib/types/Replace.js"
import type {Variables} from "../../app/server.js"
import type {AdminViewerContext} from "../../app/server/lib/admin/AdminArgs.js"
import {
  AdminLoaderErrorCode,
  type AdminLoaderErrorData
} from "../../app/server/lib/admin/adminLoaderError.js"

type ValidAdminLoaderArgs = Replace<
  LoaderFunctionArgs,
  {
    params: any // We don't care about params, so we can relax this type
    context: Variables & AppLoadContext & AdminViewerContext
  }
>

type ValidAdminLoader = (event: ValidAdminLoaderArgs) => unknown

/**
 * Creates a test suite for loaders that require admin authorization.
 * Use it to verify that the route has protection from public access
 *
 * @param loader - a loader to run tests for
 */
export const createAdminAuthLoaderSuite = (loader: ValidAdminLoader) =>
  describe("admin auth loader", () => {
    ormTest("throws 401 with setup code", async () => {
      expect.hasAssertions()

      try {
        await loader(createStubLoaderArgs())
      } catch (error) {
        const response = error as DataWithResponseInit<AdminLoaderErrorData>

        expect(response.init?.status).toBe(401)
        expect(response.data).toEqual({
          type: "admin",
          code: AdminLoaderErrorCode.SETUP
        })
      }
    })

    adminTest(
      "throws 401 with login code when admin account exist",

      async ({admin: _}) => {
        expect.hasAssertions()

        try {
          await loader(createStubLoaderArgs() as any)
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
