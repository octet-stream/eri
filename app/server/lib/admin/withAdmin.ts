import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  Params,
  RouterContextProvider
} from "react-router"

import {adminContext} from "../../contexts/admin.ts"
import {authContext} from "../../contexts/auth.ts"
import {ormContext} from "../../contexts/orm.ts"
import {resHeadersContext} from "../../contexts/resHeaders.ts"
import {Session, User} from "../../db/entities.ts"
import type {Replace} from "../types/Replace.ts"
import {
  AdminLoaderErrorCode,
  createAdminLoaderError
} from "./adminLoaderError.js"

export type AdminLoader<
  TResult,
  TContext extends
    Readonly<RouterContextProvider> = Readonly<RouterContextProvider>,
  TParams extends Params = Params
> = (event: Replace<LoaderFunctionArgs<TContext>, {params: TParams}>) => TResult

export type AdminAction<
  TResult,
  TContext extends
    Readonly<RouterContextProvider> = Readonly<RouterContextProvider>,
  TParams extends Params = Params
> = (event: Replace<ActionFunctionArgs<TContext>, {params: TParams}>) => TResult

/**
 * Defines protected admin loader/action for given function.
 *
 * This decorator wraps a `loader` or `action` function and checks if:
 *  * there's admin user - otherwise the visitor will be prompted to admin account setup;
 *  * whether the visitor is authenticated - otherwise the visitor will be prompted into the login form;
 *
 * @param loader - a function to wrap into admin priviligies checks
 */
export const withAdmin =
  <
    TResult,
    TContext extends
      Readonly<RouterContextProvider> = Readonly<RouterContextProvider>,
    TParams extends Params = Params
  >(
    fn:
      | AdminLoader<TResult, TContext, TParams>
      | AdminAction<TResult, TContext, TParams>
  ) =>
  async (args: Parameters<typeof fn>[0]): Promise<TResult> => {
    args.context
    const orm = args.context.get(ormContext)
    const auth = args.context.get(authContext)
    const resHeaders = args.context.get(resHeadersContext)

    const [admin] = await orm.em.find(
      User,

      {},

      {
        limit: 1,
        offset: 0,
        orderBy: {
          createdAt: "asc"
        }
      }
    )

    if (!admin) {
      createAdminLoaderError(AdminLoaderErrorCode.SETUP)
    }

    const {headers, response} = await auth.api.getSession({
      returnHeaders: true,
      headers: args.request.headers
    })

    // Note: in the actual result all Dates are serialized into string, so make sure to de-serialize them back
    if (!response?.session) {
      createAdminLoaderError(AdminLoaderErrorCode.LOGIN)
    }

    const session = await orm.em
      .getReference(Session, response.session.id, {wrapped: true})
      .loadOrFail()

    args.context.set(adminContext, {
      session,
      user: session.user,
      rawUser: response.user,
      rawSession: response.session
    })

    try {
      return await fn(args)
    } finally {
      const cookie = headers.get("set-cookie")

      if (cookie) {
        resHeaders.set("set-cookie", cookie)
      }
    }
  }

export const withAdminLoader = <
  TResult,
  TContext extends
    Readonly<RouterContextProvider> = Readonly<RouterContextProvider>,
  TParams extends Params = Params
>(
  fn: AdminLoader<TResult, TContext, TParams>
) => withAdmin(fn) as AdminLoader<TResult, TContext, TParams>

export const withAdminAction = <
  TResult,
  TContext extends
    Readonly<RouterContextProvider> = Readonly<RouterContextProvider>,
  TParams extends Params = Params
>(
  fn: AdminAction<TResult, TContext, TParams>
) => withAdmin(fn) as AdminAction<TResult, TContext, TParams>
