import {procedure} from "server/trpc/def"

import ssrContextCheck from "server/trpc/middleware/ssrContextCheck"

/**
 * Procedure builder for server-side usage only.
 * Adds middleware with server-side context check.
 */
const ssrProcedure = procedure.use(ssrContextCheck)

export default ssrProcedure
