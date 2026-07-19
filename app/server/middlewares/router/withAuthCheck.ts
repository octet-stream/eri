import type {MiddlewareFunction} from "react-router"

import {adminContext} from "#app/server/contexts/admin.ts"
import {authContext} from "#app/server/contexts/auth.ts"
import {ormContext} from "#app/server/contexts/orm.ts"
import {resHeadersContext} from "#app/server/contexts/resHeaders.ts"
import {Session, User} from "#app/server/db/entities.ts"
import {
  AdminLoaderErrorCode,
  createAdminLoaderError
} from "#app/server/lib/admin/adminLoaderError.ts"

// TODO: Maybe replace it with two-middleware solution, if it will work:
// 1. Calls next() and sets admin user
// 2. Checks if the user is set, then calls next(). Otherwise throws data(..., 401)
export const withAuthCheck =
  (): MiddlewareFunction =>
  async ({request, context}, next) => {
    const orm = context.get(ormContext)
    const auth = context.get(authContext)
    const resHeaders = context.get(resHeadersContext)

    const [admin] = await orm.em.find(
      User,

      {},

      {
        fields: ["id"],
        limit: 1,
        orderBy: [
          {
            id: "asc"
          },
          {
            createdAt: "asc"
          }
        ]
      }
    )

    if (!admin) {
      createAdminLoaderError(AdminLoaderErrorCode.SETUP)
    }

    const {headers, response} = await auth.api.getSession({
      returnHeaders: true,
      headers: request.headers
    })

    if (!response?.session) {
      createAdminLoaderError(AdminLoaderErrorCode.LOGIN)
    }

    const session = await orm.em
      .getReference(Session, response.session.id, {wrapped: true})
      .loadOrFail()

    context.set(adminContext, {
      session,
      user: session.user,
      rawUser: response.user,
      rawSession: response.session
    })

    try {
      return await next()
    } finally {
      const cookie = headers.get("set-cookie")

      if (cookie) {
        resHeaders.set("set-cookie", cookie)
      }
    }
  }
