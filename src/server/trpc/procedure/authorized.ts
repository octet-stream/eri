import {auth} from "server/trpc/middleware/auth"

import {ssrProcedure} from "./server"

export const procedure = ssrProcedure.use(auth)

export const authorizedProcedure = procedure
