import {z} from "zod"

import {CookiePrefix} from "./CookiePrefix.ts"

export const Session = z
  .object({
    cookiePrefix: CookiePrefix
  })
  .transform(value => Object.freeze(value))

export type ISession = z.input<typeof Session>

export type OSession = z.output<typeof Session>
