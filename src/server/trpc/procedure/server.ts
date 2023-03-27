import {withHttpCotext} from "server/trpc/middleware/withHttpCotext"

import {baseProcedure} from "./base"

/**
 * Procedure builder for server-side usage only.
 * Adds middleware with server-side context check.
 */
export const procedure = baseProcedure.use(withHttpCotext)

export const ssrProcedure = procedure
