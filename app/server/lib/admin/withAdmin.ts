import type {
  Session as DatabaseSession,
  User as DatabaseUser
} from "better-auth"

import {serverContext} from "../../contexts/server.js"
import {Session, User} from "../../db/entities.js"
import type {Action, ActionArgs} from "../types/Action.js"
import type {Loader, LoaderArgs} from "../types/Loader.js"

import {adminContext} from "../../contexts/admin.js"
import {
  AdminLoaderErrorCode,
  createAdminLoaderError
} from "./adminLoaderError.js"

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
  <TResult, TArgs extends LoaderArgs | ActionArgs>(
    fn: Loader<TResult, TArgs> | Action<TResult, TArgs>
  ) =>
  async (args: TArgs): Promise<TResult> => {
    const {auth, orm} = args.context.get(serverContext)

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

    const response = await auth.api.getSession({
      asResponse: true,
      headers: args.request.headers
    })

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

    args.context.set(adminContext, {
      session,
      user: session.user,
      rawUser: result.user,
      rawSession: result.session
    })

    try {
      return await fn(args)
    } finally {
      const cookie = response.headers.get("set-cookie")

      if (cookie) {
        const {resHeaders} = args.context.get(serverContext)

        resHeaders.set("set-cookie", cookie)
      }
    }
  }
