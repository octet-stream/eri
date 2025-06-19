import {unstable_RouterContextProvider as RouterContextProvider} from "react-router"

import type {Replace} from "../../app/lib/types/Replace.js"
import {authContext} from "../../app/server/contexts/auth.js"
import {ormContext} from "../../app/server/contexts/orm.js"
import {resHeadersContext} from "../../app/server/contexts/resHeaders.js"
import {auth} from "../../app/server/lib/auth/auth.js"
import {orm} from "../../app/server/lib/db/orm.js"
import type {ActionArgs} from "../../app/server/lib/types/Action.js"
import type {LoaderArgs} from "../../app/server/lib/types/Loader.js"

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
    const headers = new Headers()

    context.set(ormContext, orm)
    context.set(authContext, auth)
    context.set(resHeadersContext, headers)

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

export const createStubMiddlewareArgs = createStubRouteArgs<
  LoaderArgs | ActionArgs
>()
