import anyTest from "ava"

import {RequestContext} from "@mikro-orm/core"
import type {ImplementationFn, TestFn} from "ava"
import type {MikroORM} from "@mikro-orm/core"
import {NextRequest} from "next/server"
import {encode} from "next-auth/jwt"

import {getORM} from "server/lib/db/orm"
import type {Caller} from "server/trpc/router"
import {router} from "server/trpc/router"
import {User} from "server/db/entity"

import {serverAddress} from "lib/util/serverAddress"

import {
  COOKIE_NAME_SESSION,
  getCookieOptions
} from "app/api/auth/[...nextauth]/route"

import {chunk} from "../__helper__/cookie"

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

    const coookies = chunk({
      name: COOKIE_NAME_SESSION,
      value: token,
      options: getCookieOptions()
    })

    for (const {name, value} of coookies) {
      headers.append("cookie", `${name}=${value}`)
    }
  }

  const req = new NextRequest(new URL("/api/trpc", serverAddress), {headers})
  const resHeaders = new Headers()

  const caller = router.createCaller({req, resHeaders})

  return RequestContext.createAsync(orm.em, async () => fn(t, caller, orm))
})
