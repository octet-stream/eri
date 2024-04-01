import {z} from "zod"

import {SessionUser} from "../user/SessionUser.js"

export const AuthEnv = z.object({
  user: SessionUser
})

export type IAuthEnv = z.input<typeof AuthEnv>

export type OAuthEnv = z.output<typeof AuthEnv>
