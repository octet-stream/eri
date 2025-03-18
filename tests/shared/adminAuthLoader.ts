import type {UNSAFE_DataWithResponseInit as DataWithResponseInit} from "react-router"
import {expect, suite} from "vitest"

import {adminTest} from "../fixtures/admin.js"
import {ormTest} from "../fixtures/orm.js"
import {createStubLoaderArgs} from "../utils/createStubRouteArgs.js"

import {
  AdminLoaderErrorCode,
  type AdminLoaderErrorData
} from "../../app/server/lib/admin/adminLoaderError.js"
import type {Loader} from "../../app/server/lib/types/Loader.js"

/**
 * Creates a test suite for loaders that require admin authorization.
 * Use it to verify that the route has protection from public access
 *
 * @param loader - a loader to run tests for
 */
export const createAdminAuthLoaderSuite = (loader: Loader<any, any>) =>
  suite("admin auth loader", () => {
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
