import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse
} from "@remix-run/node"
import type {RootConfig, AnyRouterDef, Router, RouterCaller} from "@trpc/server"
import {FetchCreateContextFnOptions} from "@trpc/server/adapters/fetch"
import {createCallerFactory} from "@trpc/server"
import {json} from "@remix-run/node"

export type RemixRequestEvent = LoaderFunctionArgs | ActionFunctionArgs

export interface RemixContext extends FetchCreateContextFnOptions {
  event: RemixRequestEvent
}

export type RemixConfig = RootConfig<{
  ctx: RemixContext,
  meta: any,
  errorShape: any,
  transformer: any
}>

export type RemixRouter = Router<AnyRouterDef<RemixConfig>>

export interface TrpcRequestHandlerCallback<
  TResult,
  TRouter extends RemixRouter
> {
  <
    TEvent extends RemixRequestEvent
  >(
    caller: ReturnType<RouterCaller<TRouter["_def"]>>,
    event: TEvent
  ): TResult
}

export interface CreateCallerDecoratorOptions<TRouter extends RemixRouter> {
  router: TRouter
}

export function createTrpcRequestHandlerFactory<TRouter extends RemixRouter>(
  options: CreateCallerDecoratorOptions<TRouter>
) {
  const {router} = options

  const factory = createCallerFactory<TRouter["_def"]["_config"]>()(router)

  const createRemixTrpcRequestHanlder = <TResult>(
    callback: TrpcRequestHandlerCallback<TResult, TRouter>
  ) => {
    const remixTrpcRequestHandler = async <
      TEvent extends RemixRequestEvent
    >(
      event: TEvent
    ): Promise<TypedResponse<Awaited<TResult>>> => {
      const resHeaders = new Headers()
      const caller = factory({req: event.request, resHeaders, event})

      const result = await callback(caller, event)

      // TODO: I should probably copy Headers from Response to the result in this case
      if (result instanceof Response) {
        return result
      }

      return json(result)
    }

    return remixTrpcRequestHandler
  }

  return createRemixTrpcRequestHanlder
}
