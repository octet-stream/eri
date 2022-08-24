import anyTest from "ava"

import {RequestContext} from "@mikro-orm/core"
import type {ImplementationFn, TestFn} from "ava"
import type {MikroORM} from "@mikro-orm/core"
import {noop} from "lodash"

import {getORM} from "server/lib/db"
import type {Caller} from "server/trpc/route"
import {router} from "server/trpc/route"
import {User} from "server/db/entity"

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

  const caller = router.createCaller({
    req: {},
    res: {
      revalidate: noop
    }
  })

  return RequestContext.createAsync(orm.em, async () => fn(t, caller, orm))
})
