import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  RouterContextProvider
} from "react-router"

import type {Replace} from "#app/lib/types/Replace.ts"
import {authContext} from "#app/server/contexts/auth.ts"
import {ormContext} from "#app/server/contexts/orm.ts"
import {resHeadersContext} from "#app/server/contexts/resHeaders.ts"

import {createRouterArgsStubsFactory} from "../utils/createStubRouteArgs.ts"

import {authTest} from "./auth.ts"

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

export const routerTest = authTest
  .extend(
    "routerContext",

    async ({orm, auth}) => {
      const context = new RouterContextProvider()
      const headers = new Headers()

      context.set(ormContext, orm)
      context.set(authContext, auth)
      context.set(resHeadersContext, headers)

      return context
    }
  )
  .extend("routerStubs", ({routerContext}) =>
    createRouterArgsStubsFactory(routerContext)
  )

export {routerTest as test}
