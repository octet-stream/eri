import type {ActionFunctionArgs, LoaderFunctionArgs} from "react-router"

import type {Replace} from "../../app/lib/types/Replace.js"
import type {Variables} from "../../app/server.js"
import {auth} from "../../app/server/lib/auth/auth.js"
import {orm} from "../../app/server/lib/db/orm.js"

interface CreateStubRouteArgsInput<
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TContext extends Record<string, unknown> = Record<string, unknown>
> {
  params?: TParams
  request?: Request
  context?: TContext
}

const createStubRouteArgs =
  <T extends LoaderFunctionArgs | ActionFunctionArgs>() =>
  <
    TParams extends Record<string, unknown> = Record<string, unknown>,
    TContext extends Record<string, unknown> = Record<string, unknown>
  >({
    params,
    request,
    context
  }: CreateStubRouteArgsInput<TParams, TContext> = {}): Replace<
    T,
    {params: TParams; context: TContext & Variables}
  > =>
    ({
      request: request ?? new Request("http://localhost"),
      context: {
        resHeaders: new Headers(),
        auth,
        orm,

        ...context
      },
      params: params ?? ({} as TParams)
    }) as any // TypeScript complains about the type, but everything is ok in practice

/**
 * Creates stub arguments for `loader`
 */
export const createStubLoaderArgs = createStubRouteArgs<LoaderFunctionArgs>()

/**
 * Creates stub arguments for `action`
 */
export const createStubActionArgs = createStubRouteArgs<ActionFunctionArgs>()
