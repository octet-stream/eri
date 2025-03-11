import {unstable_RouterContextProvider as RouterContextProvider} from "react-router"

import type {Replace} from "../../app/lib/types/Replace.js"
import {auth} from "../../app/server/lib/auth/auth.js"
import {orm} from "../../app/server/lib/db/orm.js"
import type {ActionArgs} from "../../app/server/lib/types/Action.js"
import type {LoaderArgs} from "../../app/server/lib/types/Loader.js"

import {serverContext} from "../../app/server/contexts/server.js"

interface CreateStubRouteArgsInput<
  TParams extends Record<string, unknown> = Record<string, unknown>
> {
  params?: TParams
  request?: Request
  context?: RouterContextProvider
}

const createStubRouteArgs =
  <T extends LoaderArgs | ActionArgs>() =>
  <TParams extends Record<string, unknown> = Record<string, unknown>>({
    params,
    request,
    context = new RouterContextProvider()
  }: CreateStubRouteArgsInput<TParams> = {}): Replace<
    T,
    {
      params: TParams
    }
  > => {
    context.set(serverContext, {orm, auth, resHeaders: new Headers()})

    return {
      request: request ?? new Request("http://localhost"),
      context,
      params: params ?? ({} as TParams)
    } as any // TypeScript complains about the type, but everything is ok in practice. We can ignore this warning
  }

/**
 * Creates stub arguments for `loader`
 */
export const createStubLoaderArgs = createStubRouteArgs<LoaderArgs>()

/**
 * Creates stub arguments for `action`
 */
export const createStubActionArgs = createStubRouteArgs<ActionArgs>()
