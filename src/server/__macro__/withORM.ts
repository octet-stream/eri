import test from "ava"

import {RequestContext} from "@mikro-orm/core"
import type {MikroORM} from "@mikro-orm/core"
import type {ImplementationFn} from "ava"

import {getORM} from "server/lib/db"

type Implementation = ImplementationFn<[orm: MikroORM]>

export const withORM = test.macro(async (t, fn: Implementation) => {
  const orm = await getORM()

  return RequestContext.createAsync(orm.em, async () => fn(t, orm))
})
