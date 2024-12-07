import type {LoaderFunctionArgs} from "react-router"

import {User} from "../../db/entities.js"
import type {Loader} from "../types/Loader.js"

import type {SharedAdminContext} from "./SharedAdminContext.js"
import {
  createAdminLoaderError,
  AdminLoaderErrorCode
} from "./adminLoaderError.js"

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
    const {auth, orm} = event.context as SharedAdminContext

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
      headers: event.request.headers
    })

    if (!response?.session) {
      createAdminLoaderError(AdminLoaderErrorCode.LOGIN)
    }

    return loader(event)
  }
