import type {unstable_Loader as Loader} from "@remix-run/server-runtime"
import {unstable_defineLoader as defineLoader} from "@remix-run/node"

import {User} from "../../server/db/entities.js"

import {AdminLoaderErrorCode} from "./AdminLoaderErrorCode.js"

// TODO: Replace this with middlewares, once they arrive
// ! Hope this one will not break, because I'm not fure if Remix's compiler relies on defineLoader function or route exports to extract loaders
export const defineAdminLoader = <T extends Loader>(loader: T): T =>
  // @ts-ignore I'll fix that later
  defineLoader<T>(async event => {
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
        status: 401
      })
    }

    if (!auth.isAuthenticated()) {
      throw new Response(AdminLoaderErrorCode.LOGIN, {
        status: 401
      })
    }

    return loader(event)
  })
