import type {CreateNextContextOptions} from "@trpc/server/adapters/next"
import type {NextApiRequest, NextApiResponse} from "next"
import type {JWT} from "next-auth/jwt"

import type {User} from "server/db/entity"

export type Context = { }

export type HttpContext<R = any> = Context & {
  req: NextApiRequest
  res: NextApiResponse<R>
}

export type AuthContext = HttpContext & {
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
): GlobalContext => isHttpContext(ctx) ? ctx : {}
