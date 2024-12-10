import {z} from "zod"

import {Secret} from "./auth/Secret.js"
import {Session} from "./auth/Session.js"

export const Auth = z
  .object({
    secret: Secret,
    session: Session
  })
  .transform(value => Object.freeze(value))

export type IAuth = z.input<typeof Auth>

export type OAuth = z.output<typeof Auth>
