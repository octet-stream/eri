import anyTest from "ava"

import {RequestContext} from "@mikro-orm/core"
import type {ImplementationFn, TestFn} from "ava"
import type {MikroORM} from "@mikro-orm/core"
import {encode} from "next-auth/jwt"

import {getORM} from "server/lib/db/orm"
import type {Caller} from "server/trpc/router"
import {router} from "server/trpc/router"
import {User} from "server/db/entity"

import {serverAddress} from "lib/util/serverAddress"

import {COOKIE_NAME_SESSION} from "app/api/auth/[...nextauth]/route"

export interface WithTRPCContext {
  /**
   * Authenticated user.
   *
   * If exists, withTRPC macro will create authorization cookies for this user.
   * These cookies will then be used in the context.
   */
  auth?: User
}

type Args = [trpc: Caller, orm: MikroORM]

type Implementation = ImplementationFn<Args, WithTRPCContext>

const test = anyTest as TestFn<WithTRPCContext>

/**
 * Creates a MikroORM RequestContet and runs implementation function within that context.
 * Also creates trpc caller for testing.
 *
 * The implementation will be called with three arguments: test context, trpc caller and orm
 */
export const withTRPC = test.macro(async (t, fn: Implementation) => {
  const orm = await getORM()

  const headers = new Headers()

  // TODO: Improve session mocking
  if (t.context.auth) {
    const {auth: user} = t.context

    const token = await encode({
      token: {
        sub: user.id,
        session: {
          user: {
            id: user.id,
            email: null,
            name: null,
            image: null
          }
        }
      },
      secret: process.env.NEXTAUTH_SECRET
    })

    headers.append("cookie", `${COOKIE_NAME_SESSION}=${token}`)
  }

  const resHeaders = new Headers()
  const req = new Request(new URL("/api/trpc", serverAddress), {headers})

  const caller = router.createCaller({resHeaders, req})

  return RequestContext.createAsync(orm.em, async () => fn(t, caller, orm))
})
