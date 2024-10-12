import type {LoaderFunctionArgs} from "@remix-run/node"

import {User} from "../../db/entities.js"
import type {Loader} from "../types/Loader.js"

import {AdminLoaderErrorCode} from "./AdminLoaderErrorCode.js"

// TODO: Replace this with middlewares, once they arrive
// ! Hope this one will not break, because I'm not fure if Remix's compiler relies on defineLoader function or route exports to extract loaders
export const defineAdminLoader =
  <TResult>(loader: Loader<TResult>) =>
  async (event: LoaderFunctionArgs): Promise<TResult> => {
    const {auth, orm} = event.context

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
      throw new Response(AdminLoaderErrorCode.SETUP, {
        status: 200
      })
    }

    if (!auth.isAuthenticated()) {
      throw new Response(AdminLoaderErrorCode.LOGIN, {
        status: 200
      })
    }

    return loader(event)
  }
