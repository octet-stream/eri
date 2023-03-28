import type {CreateNextContextOptions} from "@trpc/server/adapters/next"
import type {NextApiRequest, NextApiResponse} from "next"
import type {JWT} from "next-auth/jwt"

import type {User} from "server/db/entity"

export interface Context { }

export interface HttpContext extends Context {
  req: NextApiRequest
  res: NextApiResponse
}

export interface AuthContext extends HttpContext {
  session: JWT
  user: User
}

export type GlobalContext = Context | HttpContext

export function isHttpContext(
  ctx: GlobalContext
): ctx is HttpContext {
  return !!((ctx as HttpContext)?.req && (ctx as HttpContext)?.res)
}

export const createContext = (
  ctx: CreateNextContextOptions
): GlobalContext => ctx
