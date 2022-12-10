import ssrContextCheck from "server/trpc/middleware/ssrContextCheck"

import procedure from "./base"

/**
 * Procedure builder for server-side usage only.
 * Adds middleware with server-side context check.
 */
const ssrProcedure = procedure.use(ssrContextCheck)

export default ssrProcedure
