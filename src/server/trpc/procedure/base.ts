import {trpc} from "server/trpc/def"

import ormContext from "server/trpc/middleware/ormContext"

const baseProcedure = trpc.procedure.use(ormContext)

export default baseProcedure
