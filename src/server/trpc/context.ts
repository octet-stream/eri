import type {inferAsyncReturnType as InferAsyncReturnType} from "@trpc/server"
import type {CreateNextContextOptions} from "@trpc/server/adapters/next"
import type {JWT} from "next-auth/jwt"

import type {User} from "server/db/entity"

export const createContext = ({req, res}: CreateNextContextOptions) => ({
  req, res
})

export type Context = InferAsyncReturnType<typeof createContext>

export interface AuthContext extends Context {
  session: JWT
  user: User
}
