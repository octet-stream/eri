import {withAuthorization} from "server/trpc/middleware/withAuthorization"

import {ssrProcedure} from "./server"

export const procedure = ssrProcedure.use(withAuthorization)

export const authorizedProcedure = procedure
