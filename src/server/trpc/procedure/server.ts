import {withFetchCotext} from "server/trpc/middleware/withFetchCotext"

import {baseProcedure} from "./base"

/**
 * Procedure builder for server-side usage only.
 * Adds middleware with server-side context check.
 */
export const procedure = baseProcedure.use(withFetchCotext)

export const ssrProcedure = procedure
