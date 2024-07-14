import {withAuth} from "../middlewares/withAuth.js"
import {publicProcedure} from "./public.js"

export const procedure = publicProcedure.use(withAuth)

export const protectedProcedure = procedure
