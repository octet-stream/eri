import type {MiddlewareFunction, ProcedureParams} from "@trpc/server"
import {RequestContext} from "@mikro-orm/core"

import type {GlobalContext} from "server/trpc/context"
import type {trpc} from "server/trpc/def"
import {getORM} from "server/lib/db"

// FIXME: This might break anytime, need to find a better solution
type OrmContext = MiddlewareFunction<
ProcedureParams<typeof trpc["_config"], GlobalContext>,
ProcedureParams<typeof trpc["_config"], GlobalContext>
>

const ormContext: OrmContext = async ({ctx, next}) => {
  const orm = await getORM()

  return RequestContext.createAsync(orm.em, () => next({ctx}))
}

export default ormContext
