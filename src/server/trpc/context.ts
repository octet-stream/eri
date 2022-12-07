import type {CreateNextContextOptions} from "@trpc/server/adapters/next"
import type {NextApiRequest, NextApiResponse} from "next"
import type {JWT} from "next-auth/jwt"

import type {User} from "server/db/entity"

export type Context = { }

export type SSRContext<R = any> = Context & {
  req: NextApiRequest
  res: NextApiResponse<R>
}

export type AuthContext = SSRContext & {
  session: JWT
  user: User
}

export type GlobalContext = Context | SSRContext

export function isSSRContext(
  ctx: GlobalContext
): ctx is SSRContext {
  return !!((ctx as SSRContext)?.req && (ctx as SSRContext)?.res)
}

export const createContext = (
  ctx: CreateNextContextOptions
): GlobalContext => isSSRContext(ctx) ? ctx : {}
