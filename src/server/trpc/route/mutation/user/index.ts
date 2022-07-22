import {router} from "@trpc/server"

import type {Context} from "server/trpc/context"

import createSuper from "./createSuper"
import create from "./create"

const user = router<Context>()
  .merge(createSuper)
  .merge(create)

export default user
