import test from "ava"

import {RequestContext} from "@mikro-orm/core"
import type {MikroORM} from "@mikro-orm/core"
import type {ImplementationFn} from "ava"
import {noop} from "lodash"

import {getORM} from "server/lib/db"
import {router} from "server/trpc/route"

type Caller = ReturnType<typeof router.createCaller>

type Implementation = ImplementationFn<[trpc: Caller, orm: MikroORM]>

/**
 * Creates a MikroORM connection and runs implementation function within that context.
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
