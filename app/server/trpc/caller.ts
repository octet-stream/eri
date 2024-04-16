import type {ActionFunctionArgs, LoaderFunctionArgs} from "@remix-run/node"
import {FetchCreateContextFnOptions} from "@trpc/server/adapters/fetch"
import type {AnyRouter, RootConfig, AnyRouterDef, Router, RouterCaller} from "@trpc/server"
import {createCallerFactory} from "@trpc/server"
import {json} from "@remix-run/node"

// import {createCallerFactory} from "./trpc.js"
// import {router as appRouter} from "./router.js"

export type FetchConfig = RootConfig<{
  ctx: FetchCreateContextFnOptions,
  meta: any,
  errorShape: any,
  transformer: any
}>

export type FetchRouter = Router<AnyRouterDef<FetchConfig>>

interface WithCallerParams<
  TRouter extends FetchRouter,
  TEvent extends LoaderFunctionArgs | ActionFunctionArgs
> {
  createCaller: RouterCaller<TRouter["_def"]>
  event: TEvent
}

export async function withCaller<
  TRouter extends FetchRouter,
  TArgs extends ActionFunctionArgs | LoaderFunctionArgs
>({
  createCaller,
  event
}: WithCallerParams<TRouter, TArgs>): Promise<Response> {
  const resHeaders = new Headers()
  const caller = createCaller({req: event.request, resHeaders})

  console.log(caller)

  const res = "foo"

  if (res && typeof res === "object") {
    return json(res, {
      headers: resHeaders
    })
  }

  return new Response(res, {
    headers: resHeaders
  })
}

export function createCallers<TRouter extends AnyRouter>(
  router: TRouter
) {
  const createCaller = createCallerFactory()(router)

  const withLoader = (
    event: LoaderFunctionArgs
  ) => withCaller({event, createCaller})

  const withAction = (
    event: ActionFunctionArgs
  ) => withCaller({event, createCaller})

  return {withLoader, withAction} as const
}
