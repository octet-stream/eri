import {RequestContext} from "@mikro-orm/core"

import {middleware} from "server/trpc/def"
import {getORM} from "server/lib/db"

const ormContext = middleware(async ({ctx, next}) => {
  const orm = await getORM()

  return RequestContext.createAsync(orm.em, () => next({ctx}))
})

export default ormContext
