import type {
  Session as DatabaseSession,
  User as DatabaseUser
} from "better-auth"
import type {LoaderFunctionArgs} from "react-router"

import {Session, User} from "../../db/entities.js"
import type {Loader} from "../types/Loader.js"

import type {AdminArgs, AdminViewer} from "./AdminArgs.js"
import {
  AdminLoaderErrorCode,
  createAdminLoaderError
} from "./adminLoaderError.js"
import {updateCookie} from "./updateCookie.js"

export type AdminLoaderArgs<TEvent extends LoaderFunctionArgs> =
  AdminArgs<TEvent>

// TODO: Replace this with middlewares, once they arrive
// ! Hope this one will not break, because I'm not fure if Remix's compiler relies on defineLoader function or route exports to extract loaders
/**
 * Defines protected admin loader for given function.
 *
 * This decorator wraps a `loader` function and checks if:
 *  * there's admin user - otherwise the visitor will be prompted to admin account setup;
 *  * whether the visitor is authenticated - otherwise the visitor will be prompted into the login form;
 *
 * @param loader - a function to wrap into admin priviligies checks
 */
export const defineAdminLoader =
  <TResult, TEvent extends LoaderFunctionArgs>(
    loader: Loader<TResult, TEvent>
  ) =>
  async (event: TEvent): Promise<TResult> => {
    const {auth, orm} =
      event.context as AdminLoaderArgs<LoaderFunctionArgs>["context"]

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

    // FIXME: Remove type casting when this fix is releases: https://github.com/better-auth/better-auth/pull/812
    const response = (await auth.api.getSession({
      asResponse: true,
      headers: event.request.headers
    } as any)) as unknown as Response

    // Note: in the actual result all Dates are serialized into string, so make sure to de-serialize them back
    const result = (await response.json()) as {
      user: DatabaseUser
      session: DatabaseSession
    }

    if (!result?.session) {
      createAdminLoaderError(AdminLoaderErrorCode.LOGIN)
    }

    const session = await orm.em
      .getReference(Session, result.session.id, {
        wrapped: true
      })
      .loadOrFail()

    const viewer: AdminViewer = {
      session,
      user: session.user,
      rawUser: result.user,
      rawSession: result.session
    }

    return updateCookie(event, response, () =>
      loader({...event, context: {...event.context, viewer}})
    )
  }
