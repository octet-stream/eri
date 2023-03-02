import {RequestContext} from "@mikro-orm/core"

import type {Middleware} from "server/lib/type/Middleware"
import {getORM} from "server/lib/db/orm"

/**
 * Creates a new RequestContext for MikroORM and runs the code within that context.
 * This is necessary to isolate IdentityMap per request.
 *
 * See: https://mikro-orm.io/docs/identity-map
 */
const withORMContext: Middleware = async (_req, _res, next) => {
  const orm = await getORM()

  return RequestContext.createAsync(orm.em, next)
}

export default withORMContext
