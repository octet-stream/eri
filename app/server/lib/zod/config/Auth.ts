import {z} from "zod"

import {CookiePrefix} from "./auth/CookiePrefix.ts"
import {Secret} from "./auth/Secret.ts"

export const Auth = z
  .object({
    secret: Secret,
    cookiePrefix: CookiePrefix
  })
  .transform(value => Object.freeze(value))

export type IAuth = z.input<typeof Auth>

export type OAuth = z.output<typeof Auth>
