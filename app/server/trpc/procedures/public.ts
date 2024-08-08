import {withOrm} from "../middlewares/withOrm.js"
import {trpc} from "../trpc.js"

export const procedure = trpc.procedure.use(withOrm)

export const publicProcedure = procedure
