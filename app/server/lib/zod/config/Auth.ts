import {z} from "zod"

import {Secret} from "./auth/Secret.js"
import {CookiePrefix} from "./auth/CookiePrefix.js"

export const Auth = z
  .object({
    secret: Secret,
    cookiePrefix: CookiePrefix
  })
  .transform(value => Object.freeze(value))

export type IAuth = z.input<typeof Auth>

export type OAuth = z.output<typeof Auth>
