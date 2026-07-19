import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  RouterContextProvider
} from "react-router"

import type {Replace} from "#app/lib/types/Replace.ts"

export interface CreateRouterArgsStubsInput<
  TParams extends {[x: PropertyKey]: any} = {[x: PropertyKey]: any}
> {
  params?: TParams
  request?: Request
  context?: RouterContextProvider
}

export type CreateRouterArgsStubOutput<
  TBaseArgs extends LoaderFunctionArgs | ActionFunctionArgs,
  TParams extends {[x: PropertyKey]: any}
> = Replace<TBaseArgs, {params: TParams}>

export const createRouterArgsStubsFactory = (
  baseContext: RouterContextProvider
) => {
  const createRouterArgsStubs =
    <T extends LoaderFunctionArgs | ActionFunctionArgs>() =>
    <TParams extends {[x: PropertyKey]: any} = {[x: PropertyKey]: any}>({
      params,
      request,
      context = baseContext
    }: CreateRouterArgsStubsInput<TParams>) =>
      ({
        context,
        request: request ?? new Request("http://localhost"),
        params: params ?? ({} as TParams)
      }) as any as CreateRouterArgsStubOutput<T, TParams>

  const createLoaderArgs = createRouterArgsStubs<LoaderFunctionArgs>()

  const createActionArgs = createRouterArgsStubs<ActionFunctionArgs>()

  const createMiddlewareArgs = createRouterArgsStubs()

  return {createLoaderArgs, createActionArgs, createMiddlewareArgs} as const
}
