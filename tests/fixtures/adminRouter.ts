import {serialize} from "@mikro-orm/core"
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  RouterContextProvider
} from "react-router"

import type {Replace} from "#app/lib/types/Replace.ts"
import {adminContext} from "#app/server/contexts/admin.ts"
import {authContext} from "#app/server/contexts/auth.ts"
import {ormContext} from "#app/server/contexts/orm.ts"
import {resHeadersContext} from "#app/server/contexts/resHeaders.ts"
import type {AdminViewer} from "#app/server/lib/admin/AdminArgs.ts"
import {createRouterArgsStubsFactory} from "#tests/utils/createStubRouteArgs.ts"

import {adminTest} from "./admin.ts"

export interface CreateRouterArgsStubFactoryInput<
  TParams extends {[x: PropertyKey]: any} = {[x: PropertyKey]: any}
> {
  params?: TParams
  request?: Request
  context?: RouterContextProvider
}

export type CreateRouterArgsStubFactoryOutput<
  TBaseArgs extends LoaderFunctionArgs | ActionFunctionArgs,
  TParams extends {[x: PropertyKey]: any}
> = Replace<TBaseArgs, {params: TParams}>

export const adminRouterTest = adminTest
  .extend(
    "routerContext",

    async ({orm, auth, admin}) => {
      const context = new RouterContextProvider()
      const headers = new Headers()

      const rawUser = serialize(admin.viewer)
      const rawSession = {
        ...serialize(admin.session, {forceObject: true}),
        userId: rawUser.id
      }

      const adminContextValue = {
        user: admin.viewer,
        rawUser,
        rawSession,
        session: admin.session
      } satisfies AdminViewer

      context.set(ormContext, orm)
      context.set(authContext, auth)
      context.set(resHeadersContext, headers)
      context.set(adminContext, adminContextValue)

      return context
    }
  )
  .extend("routerStubs", ({routerContext}) =>
    createRouterArgsStubsFactory(routerContext)
  )

export {adminRouterTest as test}
