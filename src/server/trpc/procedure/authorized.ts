import {withAuthorization} from "server/trpc/middleware/withAuthorization"

import {baseProcedure} from "./base"

export const procedure = baseProcedure.use(withAuthorization)

export const authorizedProcedure = procedure
